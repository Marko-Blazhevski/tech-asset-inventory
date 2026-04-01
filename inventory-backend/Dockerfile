FROM node:24-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# NestJS default port
EXPOSE 3000

# Run in development mode with watch mode enabled
CMD ["npm", "run", "start:dev"]