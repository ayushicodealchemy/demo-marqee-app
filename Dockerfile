# Use Alpine-based Node.js image
FROM node:18-alpine

# Add openssl (required for HTTPS or crypto in some Shopify libs)
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
ENV PORT=8081

# Copy package files and install only production deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev && npm cache clean --force

# Remove Shopify CLI (if not needed)
RUN npm remove @shopify/cli

# Copy remaining source files
COPY . .

# Build your Remix app
RUN npm run build

# Expose Fly.io internal port
EXPOSE 8081

# Start app using defined script (make sure it reads PORT from env)
CMD ["npm", "run", "docker-start"]
