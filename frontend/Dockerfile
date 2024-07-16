FROM node:14

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "run", "serve"]
