FROM mcr.microsoft.com/playwright:v1.41.2

WORKDIR /whalebone

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Expose the port for Playwright report
EXPOSE 9323

CMD ["npm", "run", "test"]
