import { jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendDailyReport } from '../send-report.js';

jest.mock('dotenv');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_ANALYTICS_FILE = path.join(__dirname, 'test-report-analytics-data.json');

describe('send-report.js script', () => {

  afterEach(() => {
    // Final cleanup
    if (fs.existsSync(TEST_ANALYTICS_FILE)) {
      fs.unlinkSync(TEST_ANALYTICS_FILE);
    }
     // Clear any environment variables
     delete process.env.ANALYTICS_FILE_OVERRIDE;
     delete process.env.EMAIL_USER;
     delete process.env.EMAIL_PASS;
     delete process.env.NOTIFICATION_EMAIL;
  });

  it('should send an email with correct data and reset stats', async () => {
    const mockSendMail = jest.fn();
    const mockTransporter = {
      sendMail: mockSendMail
    };

    // 1. Prepare the test data
    const today = new Date().toISOString().split('T')[0];
    const initialData = {
      daily: {
        date: today,
        pageViews: 10,
        uniqueVisitors: ['v1', 'v2', 'v3'],
        formSubmissions: { success: 2, failed: 1 },
        downloads: 5,
        projectViews: { 'Project A': 3 },
        events: [],
      },
      allTime: {
        totalPageViews: 100,
        totalVisitors: 50,
        totalFormSubmissions: 20,
        totalDownloads: 30,
      },
    };
    fs.writeFileSync(TEST_ANALYTICS_FILE, JSON.stringify(initialData, null, 2));

    // 2. Set environment variables and run the function
    process.env.ANALYTICS_FILE_OVERRIDE = TEST_ANALYTICS_FILE;
    process.env.EMAIL_USER = 'test@example.com';
    process.env.EMAIL_PASS = 'password';
    process.env.NOTIFICATION_EMAIL = 'notify@example.com';
    
    await sendDailyReport(mockTransporter);

    // 3. Assert email was sent
    expect(mockSendMail).toHaveBeenCalledTimes(1);
    const emailOptions = mockSendMail.mock.calls[0][0];
    expect(emailOptions.to).toBe('notify@example.com');
    expect(emailOptions.subject).toContain(today);
    expect(emailOptions.text).toContain('Total Page Views: 10');
    expect(emailOptions.text).toContain('Unique Visitors: 3');

    // 4. Assert stats were reset
    const finalData = JSON.parse(fs.readFileSync(TEST_ANALYTICS_FILE, 'utf-8'));
    const newToday = new Date().toISOString().split('T')[0];
    expect(finalData.daily.date).toBe(newToday);
    expect(finalData.daily.pageViews).toBe(0);
    expect(finalData.daily.uniqueVisitors).toEqual([]);
    // All-time stats should remain
    expect(finalData.allTime.totalPageViews).toBe(100);
  });

  it('should skip email and reset if there is no activity', async () => {
    const mockSendMail = jest.fn();
    const mockTransporter = {
      sendMail: mockSendMail
    };

    // 1. Prepare data with no daily activity
    const today = new Date().toISOString().split('T')[0];
    const initialData = {
      daily: {
        date: today,
        pageViews: 0,
        uniqueVisitors: [],
        formSubmissions: { success: 0, failed: 0 },
        downloads: 0,
        projectViews: {},
        events: [],
      },
      allTime: {
        totalPageViews: 100,
        totalVisitors: 50,
        totalFormSubmissions: 20,
        totalDownloads: 30,
      },
    };
    fs.writeFileSync(TEST_ANALYTICS_FILE, JSON.stringify(initialData, null, 2));

    // 2. Set environment variables and run the function
    process.env.ANALYTICS_FILE_OVERRIDE = TEST_ANALYTICS_FILE;
    
    await sendDailyReport(mockTransporter);

    // 3. Assert email was NOT sent
    expect(mockSendMail).not.toHaveBeenCalled();

    // 4. Assert stats were still reset
    const finalData = JSON.parse(fs.readFileSync(TEST_ANALYTICS_FILE, 'utf-8'));
    expect(finalData.daily.pageViews).toBe(0);
  });
});
