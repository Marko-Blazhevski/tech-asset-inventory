FROM node:24-alpine

WORKDIR /app

# 1. Copy only package files
COPY package*.json ./

# 2. Clean install
# Using 'npm install' here on an Alpine image automatically
# fetches the correct linux-arm64 binaries.
RUN npm install

# 3. Copy everything else
COPY . .

EXPOSE 5173

# 4. Use --host to ensure the Vite server is accessible outside the container
CMD ["npm", "run", "dev", "--", "--host"]