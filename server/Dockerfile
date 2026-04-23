# Use official Node.js image
FROM node:20-alpine

# Create app directory inside container
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose your app port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]