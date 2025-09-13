FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm install --prod=false

# Copy source code
COPY . .

# Expose port
EXPOSE 3333

# Start the application in development mode
CMD ["pnpm", "dev"]