#!/bin/bash

echo "Setting up Portfolio Analytics Server..."
echo ""

# Check if in server directory
if [ ! -f "package.json" ]; then
    echo "ERROR: Run this script from the server directory"
    echo "Usage: cd server && ./setup.sh"
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo ""
    echo "Creating .env file..."
    cp .env.example .env
    echo ".env file created"
    echo ""
    echo "IMPORTANT: Edit server/.env with your email credentials:"
    echo "   - EMAIL_USER: Your Gmail address"
    echo "   - EMAIL_PASS: Gmail App Password (not regular password)"
    echo "   - NOTIFICATION_EMAIL: Where to receive reports"
    echo ""
    echo "Get Gmail App Password:"
    echo "   1. Enable 2FA on your Google account"
    echo "   2. Visit: https://myaccount.google.com/apppasswords"
    echo "   3. Generate app password and paste in .env"
    echo ""
else
    echo "INFO: .env file already exists"
fi

echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit server/.env with your email credentials"
echo "2. Add VITE_ANALYTICS_API to main project .env:"
echo "   VITE_ANALYTICS_API=http://localhost:3001/api"
echo "3. Run the server: npm start"
echo "4. Test with: curl -X POST http://localhost:3001/api/send-report"
echo ""
