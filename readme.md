# 🎵 Telegram Music Bot

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/yourusername/telegram-music-bot)
[![Node.js CI](https://github.com/yourusername/telegram-music-bot/actions/workflows/node.js.yml/badge.svg)](https://github.com/yourusername/telegram-music-bot/actions/workflows/node.js.yml)

A high-performance Telegram bot for searching and downloading YouTube audio tracks.

## ✨ Features

- 🎶 High Quality M4A audio downloads
- 🔍 `/play` command with YouTube search
- 🚀 Powered by yt-dlp for fast downloads
- ☁️ Ready for Railway/Docker deployment
- 🧹 Automatic file cleanup

## 🛠 Installation

```bash
git clone https://github.com/yourusername/telegram-music-bot.git
cd telegram-music-bot
npm install
cp .env.example .env
# Edit .env with your BOT_TOKEN
node bot.js


```

## 🐳 Docker

```bash
docker build -t music-bot .
docker run -e BOT_TOKEN=your_token -p 3000:3000 music-bot
```

## ⚙️ Commands

| Command         | Description         |
| --------------- | ------------------- |
| `/play [query]` | Search and download |
| `/help`         | Show help message   |

## 📄 License

MIT © Anayet
