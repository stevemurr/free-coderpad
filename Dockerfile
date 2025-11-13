# Multi-stage Dockerfile for Free CoderPad

FROM node:20-alpine AS base

# Install Docker CLI (needed for container management)
RUN apk add --no-cache docker-cli

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Expose ports
EXPOSE 3000 3001

# Start the application
CMD ["npm", "start"]
