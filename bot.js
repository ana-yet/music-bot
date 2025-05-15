require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const yts = require("yt-search");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const express = require("express");

const token = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 3000;

const app = express();
app.get("/", (req, res) => res.send("Bot is running"));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

const bot = new TelegramBot(token, { polling: true });
const cacheDir = path.join(__dirname, "cache");

if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

bot.onText(/\/play (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1];

  bot.sendMessage(chatId, `Searching top results for "${query}"...`);

  try {
    const results = await yts(query);
    const topVideos = results.videos.slice(0, 5);

    if (!topVideos.length) {
      return bot.sendMessage(chatId, "No results found.");
    }

    const inlineKeyboard = topVideos.map((video) => [
      {
        text: `${video.title} (${video.timestamp})`,
        callback_data: `yt::${video.videoId}`,
      },
    ]);

    bot.sendMessage(chatId, "Choose a video:", {
      reply_markup: { inline_keyboard: inlineKeyboard },
    });
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "Error fetching results.");
  }
});

bot.on("callback_query", async (callback) => {
  const chatId = callback.message.chat.id;
  const videoId = callback.data.split("yt::")[1];
  const fileName = videoId + ".m4a";
  const filePath = path.join(cacheDir, fileName);
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const cookiesPath = path.join(__dirname, "cookies", "cookies.txt"); // <-- add this

  bot.sendMessage(chatId, "Downloading audio... please wait.");

  try {
    if (fs.existsSync(filePath)) {
      return bot.sendAudio(chatId, filePath);
    }

    const command = `yt-dlp "${videoUrl}" --output "${filePath}" --format bestaudio[ext=m4a]/bestaudio --cookies "${cookiesPath}"`;
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error("Download error:", err);
        bot.sendMessage(chatId, "Error downloading audio.");
        return;
      }

      console.log(stdout);
      bot.sendAudio(chatId, filePath);
    });
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "Unexpected error occurred.");
  }
});
