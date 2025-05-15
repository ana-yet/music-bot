FROM node:18

# Install ffmpeg & curl (required by yt-dlp)
RUN apt-get update && apt-get install -y ffmpeg curl

# Install yt-dlp binary
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Copy cookies (assuming you have cookies/cookies.txt)
COPY cookies/ /app/cookies/

# Set environment variables
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Run your bot
CMD ["node", "bot.js"]
