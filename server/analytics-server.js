import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const ANALYTICS_FILE = path.join(__dirname, 'analytics-data.json');

// Initialize analytics data structure
const initAnalyticsData = () => {
  if (!fs.existsSync(ANALYTICS_FILE)) {
    const initialData = {
      daily: {
        date: new Date().toISOString().split('T')[0],
        pageViews: 0,
        uniqueVisitors: new Set(),
        formSubmissions: { success: 0, failed: 0 },
        downloads: 0,
        projectViews: {},
        events: []
      },
      allTime: {
        totalPageViews: 0,
        totalVisitors: 0,
        totalFormSubmissions: 0,
        totalDownloads: 0
      }
    };
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(initialData, null, 2));
  }
};

// Load analytics data
const loadAnalytics = () => {
  const data = JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf-8'));
  // Convert uniqueVisitors array back to Set
  if (Array.isArray(data.daily.uniqueVisitors)) {
    data.daily.uniqueVisitors = new Set(data.daily.uniqueVisitors);
  }
  return data;
};

// Save analytics data
const saveAnalytics = (data) => {
  // Convert Set to array for JSON serialization
  const dataToSave = {
    ...data,
    daily: {
      ...data.daily,
      uniqueVisitors: Array.from(data.daily.uniqueVisitors)
    }
  };
  fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(dataToSave, null, 2));
};

// Reset daily stats
const resetDailyStats = () => {
  const analytics = loadAnalytics();
  analytics.daily = {
    date: new Date().toISOString().split('T')[0],
    pageViews: 0,
    uniqueVisitors: new Set(),
    formSubmissions: { success: 0, failed: 0 },
    downloads: 0,
    projectViews: {},
    events: []
  };
  saveAnalytics(analytics);
};

// Check if we need to reset (new day)
const checkAndResetIfNewDay = () => {
  const analytics = loadAnalytics();
  const today = new Date().toISOString().split('T')[0];
  if (analytics.daily.date !== today) {
    resetDailyStats();
  }
};

// Track page view
app.post('/api/track/pageview', (req, res) => {
  try {
    checkAndResetIfNewDay();
    const { page, visitorId } = req.body;
    const analytics = loadAnalytics();
    
    analytics.daily.pageViews++;
    analytics.allTime.totalPageViews++;
    
    if (visitorId && !analytics.daily.uniqueVisitors.has(visitorId)) {
      analytics.daily.uniqueVisitors.add(visitorId);
      analytics.allTime.totalVisitors++;
    }
    
    analytics.daily.events.push({
      type: 'pageview',
      page,
      timestamp: new Date().toISOString()
    });
    
    saveAnalytics(analytics);
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking page view:', error);
    res.status(500).json({ error: 'Failed to track page view' });
  }
});

// Track form submission
app.post('/api/track/form', (req, res) => {
  try {
    checkAndResetIfNewDay();
    const { formName, success } = req.body;
    const analytics = loadAnalytics();
    
    if (success) {
      analytics.daily.formSubmissions.success++;
    } else {
      analytics.daily.formSubmissions.failed++;
    }
    analytics.allTime.totalFormSubmissions++;
    
    analytics.daily.events.push({
      type: 'form_submission',
      formName,
      success,
      timestamp: new Date().toISOString()
    });
    
    saveAnalytics(analytics);
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking form:', error);
    res.status(500).json({ error: 'Failed to track form submission' });
  }
});

// Track download
app.post('/api/track/download', (req, res) => {
  try {
    checkAndResetIfNewDay();
    const { fileName } = req.body;
    const analytics = loadAnalytics();
    
    analytics.daily.downloads++;
    analytics.allTime.totalDownloads++;
    
    analytics.daily.events.push({
      type: 'download',
      fileName,
      timestamp: new Date().toISOString()
    });
    
    saveAnalytics(analytics);
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking download:', error);
    res.status(500).json({ error: 'Failed to track download' });
  }
});

// Track project view
app.post('/api/track/project', (req, res) => {
  try {
    checkAndResetIfNewDay();
    const { projectName } = req.body;
    const analytics = loadAnalytics();
    
    if (!analytics.daily.projectViews[projectName]) {
      analytics.daily.projectViews[projectName] = 0;
    }
    analytics.daily.projectViews[projectName]++;
    
    analytics.daily.events.push({
      type: 'project_view',
      projectName,
      timestamp: new Date().toISOString()
    });
    
    saveAnalytics(analytics);
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking project view:', error);
    res.status(500).json({ error: 'Failed to track project view' });
  }
});

// Get current stats (for testing)
app.get('/api/stats', (req, res) => {
  try {
    const analytics = loadAnalytics();
    res.json({
      daily: {
        ...analytics.daily,
        uniqueVisitors: analytics.daily.uniqueVisitors.size
      },
      allTime: analytics.allTime
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

// Send daily email report
const sendDailyReport = async () => {
  try {
    const analytics = loadAnalytics();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    // Only send if we have data from yesterday
    if (analytics.daily.date !== yesterdayStr) {
      console.log('No data to send for yesterday');
      return;
    }
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Use App Password for Gmail
      }
    });
    
    const projectViewsText = Object.entries(analytics.daily.projectViews)
      .map(([name, count]) => `  - ${name}: ${count} views`)
      .join('\n') || '  None';
    
    const emailContent = `
DAILY PORTFOLIO ANALYTICS REPORT
Date: ${analytics.daily.date}

VISITORS:
  - Total Page Views: ${analytics.daily.pageViews}
  - Unique Visitors: ${analytics.daily.uniqueVisitors.size}

FORM SUBMISSIONS:
  - Successful: ${analytics.daily.formSubmissions.success}
  - Failed: ${analytics.daily.formSubmissions.failed}

DOWNLOADS:
  - Resume Downloads: ${analytics.daily.downloads}

PROJECT VIEWS:
${projectViewsText}

ALL-TIME STATS:
  - Total Page Views: ${analytics.allTime.totalPageViews}
  - Total Visitors: ${analytics.allTime.totalVisitors}
  - Total Form Submissions: ${analytics.allTime.totalFormSubmissions}
  - Total Downloads: ${analytics.allTime.totalDownloads}

---
This report was automatically generated from your portfolio analytics.
    `;
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: `Portfolio Analytics Report - ${analytics.daily.date}`,
      text: emailContent
    });
    
    console.log('Daily report sent successfully');
    
    // Reset for new day after sending
    resetDailyStats();
  } catch (error) {
    console.error('Error sending daily report:', error);
  }
};

// Schedule daily email at 11:59 PM
cron.schedule('59 23 * * *', () => {
  console.log('Running daily analytics report...');
  sendDailyReport();
});

// Manual trigger endpoint for testing
app.post('/api/send-report', async (req, res) => {
  try {
    await sendDailyReport();
    res.json({ success: true, message: 'Report sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send report' });
  }
});

// Initialize and start server
initAnalyticsData();
app.listen(PORT, () => {
  console.log(`Analytics server running on port ${PORT}`);
  console.log(`Scheduled daily report at 11:59 PM`);
});
