import request from 'supertest';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { jest } from '@jest/globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock nodemailer
const mockSendMail = jest.fn();
jest.unstable_mockModule('nodemailer', () => ({
  default: {
    createTransport: jest.fn(() => ({
      sendMail: mockSendMail
    }))
  }
}));

// Mock node-cron
jest.unstable_mockModule('node-cron', () => ({
  default: {
    schedule: jest.fn()
  }
}));

const TEST_ANALYTICS_FILE = path.join(__dirname, 'test-analytics-data.json');

describe('Analytics Server API', () => {
  let app;

  beforeAll(async () => {
    // Set test environment
    process.env.PORT = 3002;
    
    // Create express app for testing
    app = express();
    app.use(cors());
    app.use(express.json());

    // Helper functions
    const loadAnalytics = () => {
      if (!fs.existsSync(TEST_ANALYTICS_FILE)) {
        return {
          daily: {
            date: new Date().toISOString().split('T')[0],
            pageViews: 0,
            uniqueVisitors: [],
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
      }
      return JSON.parse(fs.readFileSync(TEST_ANALYTICS_FILE, 'utf-8'));
    };

    const saveAnalytics = (data) => {
      fs.writeFileSync(TEST_ANALYTICS_FILE, JSON.stringify(data, null, 2));
    };

    // Define routes
    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
    });

    app.post('/api/track/pageview', (req, res) => {
      try {
        const { page, visitorId } = req.body;
        const analytics = loadAnalytics();
        
        analytics.daily.pageViews++;
        analytics.allTime.totalPageViews++;
        
        if (visitorId && !analytics.daily.uniqueVisitors.includes(visitorId)) {
          analytics.daily.uniqueVisitors.push(visitorId);
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
        res.status(500).json({ error: 'Failed to track page view' });
      }
    });

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
          type: 'form',
          formName,
          success,
          timestamp: new Date().toISOString()
        });
        
        saveAnalytics(analytics);
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ error: 'Failed to track form submission' });
      }
    });

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
        res.status(500).json({ error: 'Failed to track download' });
      }
    });

    app.post('/api/track/project', (req, res) => {
      try {
        const { projectName } = req.body;
        const analytics = loadAnalytics();
        
        if (!analytics.daily.projectViews[projectName]) {
          analytics.daily.projectViews[projectName] = 0;
        }
        analytics.daily.projectViews[projectName]++;
        
        analytics.daily.events.push({
          type: 'project',
          projectName,
          timestamp: new Date().toISOString()
        });
        
        saveAnalytics(analytics);
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ error: 'Failed to track project view' });
      }
    });

    app.get('/api/stats', (req, res) => {
      try {
        const analytics = loadAnalytics();
        res.json(analytics);
      } catch (error) {
        res.status(500).json({ error: 'Failed to get stats' });
      }
    });
  });

  beforeEach(() => {
    // Clean up test file before each test
    if (fs.existsSync(TEST_ANALYTICS_FILE)) {
      fs.unlinkSync(TEST_ANALYTICS_FILE);
    }
    mockSendMail.mockClear();
  });

  afterAll(() => {
    // Clean up test file
    if (fs.existsSync(TEST_ANALYTICS_FILE)) {
      fs.unlinkSync(TEST_ANALYTICS_FILE);
    }
  });

  describe('GET /health', () => {
    it('should return healthy status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('healthy');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('POST /api/track/pageview', () => {
    it('should track page view successfully', async () => {
      const response = await request(app)
        .post('/api/track/pageview')
        .send({
          page: '/about',
          visitorId: 'visitor_123'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      const stats = await request(app).get('/api/stats');
      expect(stats.body.daily.pageViews).toBe(1);
      expect(stats.body.allTime.totalPageViews).toBe(1);
    });

    it('should track unique visitors', async () => {
      await request(app)
        .post('/api/track/pageview')
        .send({ page: '/', visitorId: 'visitor_1' });

      await request(app)
        .post('/api/track/pageview')
        .send({ page: '/about', visitorId: 'visitor_1' });

      await request(app)
        .post('/api/track/pageview')
        .send({ page: '/contact', visitorId: 'visitor_2' });

      const stats = await request(app).get('/api/stats');
      expect(stats.body.daily.pageViews).toBe(3);
      expect(stats.body.daily.uniqueVisitors).toHaveLength(2);
      expect(stats.body.allTime.totalVisitors).toBe(2);
    });

    it('should record page view events', async () => {
      await request(app)
        .post('/api/track/pageview')
        .send({ page: '/projects', visitorId: 'visitor_1' });

      const stats = await request(app).get('/api/stats');
      expect(stats.body.daily.events).toHaveLength(1);
      expect(stats.body.daily.events[0].type).toBe('pageview');
      expect(stats.body.daily.events[0].page).toBe('/projects');
    });
  });

  describe('POST /api/track/form', () => {
    it('should track successful form submission', async () => {
      const response = await request(app)
        .post('/api/track/form')
        .send({
          formName: 'contact_form',
          success: true
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      const stats = await request(app).get('/api/stats');
      expect(stats.body.daily.formSubmissions.success).toBe(1);
      expect(stats.body.daily.formSubmissions.failed).toBe(0);
    });

    it('should track failed form submission', async () => {
      await request(app)
        .post('/api/track/form')
        .send({
          formName: 'contact_form',
          success: false
        });

      const stats = await request(app).get('/api/stats');
      expect(stats.body.daily.formSubmissions.success).toBe(0);
      expect(stats.body.daily.formSubmissions.failed).toBe(1);
    });
  });

  describe('POST /api/track/download', () => {
    it('should track download successfully', async () => {
      const response = await request(app)
        .post('/api/track/download')
        .send({
          fileName: 'resume.pdf'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      const stats = await request(app).get('/api/stats');
      expect(stats.body.daily.downloads).toBe(1);
      expect(stats.body.allTime.totalDownloads).toBe(1);
    });

    it('should track multiple downloads', async () => {
      await request(app).post('/api/track/download').send({ fileName: 'resume.pdf' });
      await request(app).post('/api/track/download').send({ fileName: 'resume.pdf' });
      await request(app).post('/api/track/download').send({ fileName: 'portfolio.pdf' });

      const stats = await request(app).get('/api/stats');
      expect(stats.body.daily.downloads).toBe(3);
    });
  });

  describe('POST /api/track/project', () => {
    it('should track project view successfully', async () => {
      const response = await request(app)
        .post('/api/track/project')
        .send({
          projectName: 'Portfolio Website'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      const stats = await request(app).get('/api/stats');
      expect(stats.body.daily.projectViews['Portfolio Website']).toBe(1);
    });

    it('should track multiple views for different projects', async () => {
      await request(app).post('/api/track/project').send({ projectName: 'Project A' });
      await request(app).post('/api/track/project').send({ projectName: 'Project A' });
      await request(app).post('/api/track/project').send({ projectName: 'Project B' });

      const stats = await request(app).get('/api/stats');
      expect(stats.body.daily.projectViews['Project A']).toBe(2);
      expect(stats.body.daily.projectViews['Project B']).toBe(1);
    });
  });

  describe('GET /api/stats', () => {
    it('should return analytics data', async () => {
      const response = await request(app).get('/api/stats');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('daily');
      expect(response.body).toHaveProperty('allTime');
      expect(response.body.daily).toHaveProperty('pageViews');
      expect(response.body.daily).toHaveProperty('uniqueVisitors');
      expect(response.body.daily).toHaveProperty('formSubmissions');
      expect(response.body.daily).toHaveProperty('downloads');
      expect(response.body.daily).toHaveProperty('projectViews');
    });
  });

  describe('Error Handling', () => {
    it('should handle missing required fields in pageview', async () => {
      const response = await request(app)
        .post('/api/track/pageview')
        .send({});

      expect(response.status).toBe(200);
    });

    it('should handle missing required fields in form tracking', async () => {
      const response = await request(app)
        .post('/api/track/form')
        .send({});

      expect(response.status).toBe(200);
    });
  });

  describe('Data Persistence', () => {
    it('should persist data between requests', async () => {
      await request(app).post('/api/track/pageview').send({ page: '/', visitorId: 'v1' });
      await request(app).post('/api/track/form').send({ formName: 'contact', success: true });
      await request(app).post('/api/track/download').send({ fileName: 'resume.pdf' });

      const stats = await request(app).get('/api/stats');
      expect(stats.body.daily.pageViews).toBe(1);
      expect(stats.body.daily.formSubmissions.success).toBe(1);
      expect(stats.body.daily.downloads).toBe(1);
    });
  });
});
