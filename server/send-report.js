
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getAnalyticsFile = () => process.env.ANALYTICS_FILE_OVERRIDE || path.join(__dirname, 'analytics-data.json');

// Ensure analytics file exists before proceeding
const checkFile = () => {
    const analyticsFile = getAnalyticsFile();
    if (!fs.existsSync(analyticsFile)) {
        console.error('Analytics data file not found. Exiting.');
        process.exit(1);
    }
}

// Load analytics data
const loadAnalytics = () => {
  const analyticsFile = getAnalyticsFile();
  if (!fs.existsSync(analyticsFile)) {
    // This case can happen in tests, so we need to handle it gracefully
    return {
        daily: { date: new Date().toISOString().split('T')[0], pageViews: 0, uniqueVisitors: new Set(), formSubmissions: { success: 0, failed: 0 }, downloads: 0, projectViews: {}, events: [] },
        allTime: { totalPageViews: 0, totalVisitors: 0, totalFormSubmissions: 0, totalDownloads: 0 }
      };
  }
  const data = JSON.parse(fs.readFileSync(analyticsFile, 'utf-8'));
  // Convert uniqueVisitors array back to Set
  if (Array.isArray(data.daily.uniqueVisitors)) {
    data.daily.uniqueVisitors = new Set(data.daily.uniqueVisitors);
  } else if (!data.daily.uniqueVisitors) {
    data.daily.uniqueVisitors = new Set();
  }
  return data;
};

// Save analytics data
const saveAnalytics = (data) => {
  const analyticsFile = getAnalyticsFile();
  const dataToSave = {
    ...data,
    daily: {
      ...data.daily,
      uniqueVisitors: data.daily.uniqueVisitors instanceof Set
        ? Array.from(data.daily.uniqueVisitors)
        : data.daily.uniqueVisitors
    }
  };
  fs.writeFileSync(analyticsFile, JSON.stringify(dataToSave, null, 2));
};

// Reset daily stats
const resetDailyStats = () => {
  checkFile();
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
  console.log('Daily stats have been reset.');
};

// Send daily email report
const sendDailyReport = async (transporter) => {
  checkFile();
  console.log('Starting daily analytics report job...');
  try {
    const analytics = loadAnalytics();
    const reportDate = analytics.daily.date;

    // Check if there's anything to report
    if (analytics.daily.pageViews === 0 && analytics.daily.uniqueVisitors.size === 0) {
      console.log(`No activity recorded for ${reportDate}. Skipping email.`);
      // Still reset the stats for the new day
      resetDailyStats();
      return;
    }

    // If no transporter is provided, create a default one
    if (!transporter) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    }

    const projectViewsText = Object.entries(analytics.daily.projectViews)
      .map(([name, count]) => `  - ${name}: ${count} views`)
      .join('\n') || '  None';

    const emailContent = `
DAILY PORTFOLIO ANALYTICS REPORT
Date: ${reportDate}

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

    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: `Portfolio Analytics Report - ${reportDate}`,
      text: emailContent
    });

    console.log(`Daily report for ${reportDate} sent successfully.`);

    // Reset stats for the new day after sending the report
    resetDailyStats();

  } catch (error) {
    console.error('Error processing daily report:', error);
    process.exit(1); // Exit with error code to indicate failure in Kubernetes
  }
};

export { sendDailyReport };
