require('dotenv').config();
const { Telegraf } = require('telegraf');
const Tour = require('./db/models/tour')
const { connect } = require('mongoose');

async function giveTour (minTemp) {
  await connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  let tours = await Tour.find();
  let toursForUser = tours.filter(el => el.temperature >= minTemp);
  let tourUser = toursForUser.sort((a, b) => a.price - b.price);
  let bestTourForUser = [tourUser[0]];
  for (let i = 1; i < tourUser.length; i += 1) {
    if (tourUser[i].country !== bestTourForUser[0].country) {
      bestTourForUser.push(tourUser[i])
      break
    }
  }
  console.log('TOURS =>', tourUser[0])
  return bestTourForUser
}

const bot = new Telegraf('1678316149:AAEei9ZXs34r7Mw_hKF6x4BUcAwfSTe5o7I');

bot.start((ctx) => {
  console.log('START')
  ctx.reply(`Привет, ${ctx.from.first_name}! Напиши минимальную температуру воздуха, которую ты хочешь :)`)
});

bot.on('message', async (ctx) => {
  // console.log(giveTour(20))
  let minTemp = Number(ctx.message.text);
  const tours = await giveTour(minTemp)
  console.log('TOURSSSSSSSS++++>', tours[0])
  ctx.reply(`Reply: 🌟🌟🌟🌟🌟✈️ Самое выгодное предложение на данный момент, это тур на ${tours[0].tourDuration} дней в город ${tours[0].city},\n температура воздуха ${tours[0].temperature},\n отель ${tours[0].hotel},\n цена за человека ${tours[0].price / 2} \n купить можно по ссылке ${tours[0].url} \n\n 🌟🌟🌟🌟✈️ Второй тур по рейтингу это тур на ${tours[1].tourDuration} дней в город ${tours[1].city},\n температура воздуха ${tours[1].temperature},\n отель ${tours[1].hotel},\n цена за человека ${tours[1].price / 2} \n купить можно по ссылке ${tours[1].url} \n\n Хорошего отдыха! 🏝🏝🏝🏝🏝`)
  console.log('MESSAGE =>', minTemp)
  // console.log('first element =>', await giveTour(minTemp)[0])
  // await ctx.reply(`Вот что я нашёл для тебя:\n${giveTour(minTemp)[0].country}, ${giveTour(minTemp)[0].city}, ${giveTour(minTemp)[0].hotel}, ${giveTour(minTemp)[0].temperature}, ${giveTour(minTemp)[0].price},\n
  // ${giveTour(minTemp)[1].country}, ${giveTour(minTemp)[1].city}, ${giveTour(minTemp)[1].hotel}, ${giveTour(minTemp)[1].temperature}, ${giveTour(minTemp)[1].price}`)
})

bot.launch()
