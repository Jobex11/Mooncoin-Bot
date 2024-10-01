const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config(); //

const app = express();
const port = process.env.PORT || 3000;

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username
    ? `@${msg.from.username}`
    : msg.from.first_name;
  const welcomeMessage = `Welcome ${username} to  Kandy bot ! 🚀\n\n Kandy bot is a bot for the mooncoin token, allowing you to spin and earn mooncoin. \n\n Invite more frineds = Get more spins = Earn more poins = More $Moon!`;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Join Group 🌗", url: "https://t.me/+6C58yfinnNM3NjE0" },
          { text: "Join Channel 🌛", url: "https://t.me/kandyformooncoin" },
        ],
        [
          {
            text: "View Mooncoin App 📱",
            url: "https://t.me/mooncoin_spinbot/kandybot",
          },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, welcomeMessage, options);
});

//  route for health check
app.get("/", (req, res) => {
  res.send("Telegram Bot is running!");
});

// Start Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
