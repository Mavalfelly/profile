import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const getAnalyticsFile = () => process.env.ANALYTICS_FILE_OVERRIDE || path.join(__dirname, 'analytics-data.json');

// Initialize analytics data structure
const initAnalyticsData = () => {
    const analyticsFile = getAnalyticsFile();
    if (!fs.existsSync(analyticsFile)) {
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
        fs.writeFileSync(analyticsFile, JSON.stringify(initialData, null, 2));
    }
};

// Load analytics data
const loadAnalytics = () => {
  const analyticsFile = getAnalyticsFile();
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
  // Convert Set to array for JSON serialization (create deep copy to avoid mutation)
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
// The cron job is now responsible for resetting stats.
// This server just logs to the current day file.

// Track page view
app.post('/api/track/pageview', (req, res) => {
  try {
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

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Initialize and start server
initAnalyticsData();
app.listen(PORT, () => {
  console.log(`Analytics server running on port ${PORT}`);
});
