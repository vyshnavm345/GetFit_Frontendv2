FROM node:21-alpine

WORKDIR /client

COPY package.json package-lock.json* ./

# Install only prod dependencies if you're optimizing
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Build the React app
RUN npm run build
