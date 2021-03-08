/* eslint-disable max-len */
process.env.NTBA_FIX_319 = 1; // решение проблемы depricated
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const Tour = require('./db/models/tour');

// const express = require('express');

const TOKEN = '1553326843:AAGphi2ZEoRiC6RNGwc-NL_BD21JRDA48lM';
const { log } = console;
const bot = new TelegramBot(TOKEN, {
  // polling - открываем постоянное соединение
  polling: {
    interval: 300, // интервал между запросами с клиента (то есть с ноде)
    // параметр авто старт обработает и те команды когда бот был выключен
    autoStart: false,
    // params timeout - устанавливает задержку по запросам с сервера
    params: {
      timeout: 10,
    },
  },
});
// обработчик команд обратный символ экранирует \
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  const temp = +msg.text;
  log(temp);
  const data = await Tour.find({ temperature: temp });

  const answer = JSON.stringify(data);
  log(data);
  bot.sendMessage(chatId, `🌟🌟🌟🌟🌟✈️ Самое выгодное предложение на данный момент, это тур на 7 дней в город ${data[0].city},\n температура воздуха ${data[0].temp},\n отель ${data[0].hotel},\n цена за человека ${data[0].price / 2} \n купить можно по ссылке ${data[0].turLink} \n\n 🌟🌟🌟🌟✈️ Второй тур по рейтингу это тур на 7 дней в город ${data[1].city},\n температура воздуха ${data[1].temp},\n отель ${data[1].hotel},\n цена за человека ${data[1].price / 2} \n купить можно по ссылке ${data[1].turLink} \n\n 🌟🌟🌟✈️ Третий тур по рейтингу это тур на 7 дней в город ${data[2].city},\n температура воздуха ${data[2].temp},\n отель ${data[2].hotel},\n цена за человека ${data[2].price / 2} \n купить можно по ссылке ${data[2].turLink}\n\n Хорошего отдыха! 🏝🏝🏝🏝🏝`);
  // bot.sendMessage(chatId, answer);
});
// send a message to the chat acknowledging receipt of their message
// bot.onText(/\/start/, (msg) => {
//   log('hello')
//   const { id } = msg.chat;
//   bot.sendMessage(id, 'Hello')
// })

// bot.onText(/\/help(.+)/, (msg, arr) => {
//   log('hello')
//   log(arr)
//   const { id } = msg.chat;
//   bot.sendMessage(id, 'Hello')
// })

// const app = express();
// // cобытие на прослушку сообщений в боте как addEventListener
// bot.on('message', (msg) => {
//   log(msg)
//   // деструктурируем id чата
//   const { id } = msg.chat

//   // отправить сообщение в бот так как все отправления в бот это промисы то после них можно делать than . catch
//   bot.sendMessage(id, JSON.stringify(msg)).then(() => {
//     log('message has been send');
//   }).catch((err) => {
//     log(err);
//   })
// });

// app.listen(3000, () => {
//   log('Tg is here)')
// });
