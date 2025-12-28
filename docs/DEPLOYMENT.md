# Deployment Setup Guide

## Prerequisites
- Render account with DNS cert already configured
- GitHub repository with the portfolio code

## Step 1: Create Render Services

### Analytics Server
1. Go to Render Dashboard → New → Web Service
2. Connect your GitHub repository
3. Configure:
   - **Name**: `portfolio-analytics-server`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free

4. Add Environment Variables:
   - `EMAIL_USER` - Your Gmail address
   - `EMAIL_PASS` - Your Gmail app password
   - `NOTIFICATION_EMAIL` - Email to receive analytics reports
   - `PORT` - 3001
   - `NODE_ENV` - production

5. Copy the service URL (e.g., `https://portfolio-analytics-server.onrender.com`)

### Frontend Static Site
1. Go to Render Dashboard → New → Static Site
2. Connect your GitHub repository
3. Configure:
   - **Name**: `portfolio`
   - **Build Command**: `npm ci && npm run test:ci && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: Free

4. Add Environment Variables:
   - `VITE_EMAILJS_SERVICE_ID` - Your EmailJS service ID
   - `VITE_EMAILJS_TEMPLATE_ID` - Your EmailJS template ID
   - `VITE_EMAILJS_PUBLIC_KEY` - Your EmailJS public key
   - `VITE_ANALYTICS_API` - `https://portfolio-analytics-server.onrender.com/api`

5. Configure your custom domain with the existing DNS cert

## Step 2: Get Render Deploy Hooks

### Analytics Server Deploy Hook
1. Go to your analytics server settings in Render
2. Navigate to "Settings" → "Deploy Hook"
3. Copy the deploy hook URL
4. In GitHub: Settings → Secrets and variables → Actions → New repository secret
5. Name: `RENDER_DEPLOY_HOOK_ANALYTICS`
6. Value: Paste the deploy hook URL

### Frontend Deploy Hook
1. Go to your frontend static site settings in Render
2. Navigate to "Settings" → "Deploy Hook"
3. Copy the deploy hook URL
4. In GitHub: Settings → Secrets and variables → Actions → New repository secret
5. Name: `RENDER_DEPLOY_HOOK_FRONTEND`
6. Value: Paste the deploy hook URL

## Step 3: Push to GitHub

The GitHub Actions workflow will automatically:
1. Run on push to `main` or `portfolio-enhancement` branches
2. Install dependencies
3. Run linting (non-blocking)
4. Run tests with coverage
5. Build the project
6. Deploy analytics server to Render
7. Deploy frontend to Render

## Workflow Triggers

- **Push to main/portfolio-enhancement**: Full build, test, and deploy
- **Pull Requests**: Build and test only (no deployment)

## Monitoring

- Check GitHub Actions tab for build/test results
- Check Render Dashboard for deployment status
- Analytics server health: `https://portfolio-analytics-server.onrender.com/health`
- Frontend: Your custom domain

## Notes

- Render free tier services sleep after 15 minutes of inactivity
- First request after sleep may take 30-50 seconds
- Tests must pass for deployment to proceed
- Deploy hooks trigger deployments without GitHub Actions if needed
