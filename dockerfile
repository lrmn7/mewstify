# Dockerfile
FROM node:18

# Set the working directory to /main/mewwme
WORKDIR /main/mewwme

# Set the NODE_PATH environment variable
ENV NODE_PATH=/usr/local/lib/node_modules

# Copy package.json and tsconfig.json to the working directory
COPY package.json .
COPY tsconfig.json .

# Install npm dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Set labels for the Docker image
LABEL name="mewwme" version="7.0"

EXPOSE 6969

# Start the mewwme application using PM2
CMD ["yarn", "start:prod"]