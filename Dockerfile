FROM node:18

# Install ffmpeg & curl (yt-dlp dependency)
RUN apt-get update && apt-get install -y ffmpeg curl

# Install yt-dlp (needed by yt-dlp-exec)
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV YOUTUBE_DL_SKIP_PYTHON_CHECK=1
ENV PORT=3000

EXPOSE 3000

CMD ["node", "bot.js"]
