# Use a specific Node.js version for reproducibility
FROM node:18-alpine

WORKDIR /app

# Copy package configuration and install dependencies
# Note: We copy from the 'server' subdirectory of the build context
COPY server/package.json server/package-lock.json* ./
RUN npm install

# Copy the backend source code
COPY server/ .

# The analytics data file will be mounted as a volume,
# so we don't need to include it in the image.
# We ensure the app user has permissions to write to the volume.
RUN mkdir -p /app/data && chown -R node:node /app/data

# Switch to a non-root user for security
USER node

# Expose the application port
EXPOSE 3001

# Start the server
CMD ["node", "analytics-server.js"]
