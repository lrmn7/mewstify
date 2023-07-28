# Base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Bundle rest of the source code
COPY . .

# Environment variables
ENV BOT_TOKEN=
ENV BOT_SECRET=
ENV MONGO_CONNECTION=
ENV ERROR_LOGS=
ENV JOIN_LEAVE_LOGS=
ENV SESSION_PASSWORD=
ENV WEATHERSTACK_KEY=
ENV STRANGE_API_KEY=
ENV SPOTIFY_CLIENT_ID=
ENV SPOTIFY_CLIENT_SECRET=
ENV DASHBOARD_ENABLED=
ENV DASHBOARD_BASE_URL=
ENV DASHBOARD_FAILURE_URL=
ENV DASHBOARD_PORT=
ENV LAVALINK_HOST=
ENV LAVALINK_PORT=
ENV LAVALINK_PASSWORD=
ENV LAVALINK_ID=
ENV LAVALINK_SECURE=
ENV BOT_PREFIX=
ENV DASHBOARD_PORT=

# Define the command to run your Node.js application
CMD [ "node", "bot.js" ]