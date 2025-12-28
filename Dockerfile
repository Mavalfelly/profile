# Stage 1: Build the React application
FROM node:18-alpine AS build

WORKDIR /app

# Copy package configuration and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Set the build-time environment variable for the API
# This will be replaced by the actual URL during the Kubernetes build process
ARG VITE_ANALYTICS_API=/api
ENV VITE_ANALYTICS_API=${VITE_ANALYTICS_API}

# Build the static assets
RUN npm run build

# Stage 2: Serve the static assets with Nginx
FROM nginx:1.25-alpine

# Copy the built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the nginx configuration
COPY k8s/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
