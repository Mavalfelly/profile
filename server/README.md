# Portfolio Analytics Server

A lightweight Node.js server that tracks portfolio analytics and sends daily email reports.

## Features

- Track page views, form submissions, downloads, and project views
- Daily email reports sent automatically at 11:59 PM
- Simple JSON file storage (no database required)
- CORS enabled for frontend integration

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Email

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` with your email settings:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
NOTIFICATION_EMAIL=where-to-send-reports@gmail.com
PORT=3001
```

**Important for Gmail users:**
- Don't use your regular Gmail password
- Generate an App Password: https://myaccount.google.com/apppasswords
- Enable 2FA on your Google account first

### 3. Run the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

### 4. Update Frontend Environment

Add to your main project's `.env`:

```env
VITE_ANALYTICS_API=http://localhost:3001/api
```

For production (Render), set:
```env
VITE_ANALYTICS_API=https://your-render-backend-url.com/api
```

## Deployment to Render

### Option 1: Same Repository (Monorepo)

In your main `render.yaml`, add:

```yaml
services:
  # Existing frontend service
  - type: web
    name: portfolio
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    
  # New analytics backend service
  - type: web
    name: portfolio-analytics
    env: node
    region: oregon
    plan: free
    buildCommand: cd server && npm install
    startCommand: cd server && npm start
    envVars:
      - key: EMAIL_USER
        sync: false
      - key: EMAIL_PASS
        sync: false
      - key: NOTIFICATION_EMAIL
        sync: false
      - key: PORT
        value: 3001
```

### Option 2: Separate Render Service

1. Push the `server` directory to a separate Git repository
2. Create a new Web Service on Render
3. Connect the repository
4. Set environment variables in Render dashboard
5. Deploy

## API Endpoints

### POST `/api/track/pageview`
```json
{
  "page": "/",
  "visitorId": "visitor_123456"
}
```

### POST `/api/track/form`
```json
{
  "formName": "contact_form",
  "success": true
}
```

### POST `/api/track/download`
```json
{
  "fileName": "Matt_Feliciano_Resume.pdf"
}
```

### POST `/api/track/project`
```json
{
  "projectName": "Don's Asian Cuisine"
}
```

### GET `/api/stats`
Returns current analytics data (for testing)

### POST `/api/send-report`
Manually trigger email report (for testing)

## Daily Email Report

Reports are automatically sent at 11:59 PM daily with:
- Total page views and unique visitors
- Form submission success/failure counts
- Resume download count
- Individual project view counts
- All-time cumulative statistics

## Testing

Test the email functionality:
```bash
curl -X POST http://localhost:3001/api/send-report
```

Check current stats:
```bash
curl http://localhost:3001/api/stats
```

## Optional: SMS Notifications with Twilio

To receive SMS notifications in addition to email, add Twilio credentials to `.env`:

```env
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_FROM=+1234567890
TWILIO_PHONE_TO=+1234567890
```

Install Twilio:
```bash
npm install twilio
```

Uncomment SMS code in `analytics-server.js` (see TODO comments).

## Troubleshooting

**Email not sending:**
- Verify Gmail App Password is correct
- Check that 2FA is enabled on Google account
- Try with a different email provider if Gmail doesn't work

**CORS errors:**
- Ensure frontend `.env` has correct `VITE_ANALYTICS_API` URL
- Check that server is running on correct port

**Daily report not triggering:**
- Server must be running continuously
- Check server logs for cron execution
- Test manually with `/api/send-report` endpoint
