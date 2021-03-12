require('dotenv').config();
const express = require('express');
const { connect } = require('mongoose');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const schedule = require('node-schedule');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const seed = require('./db/seed');
const User = require('./db/models/user');
// const bot = require ('./bot');
// Создаем приложение express.
const app = express();
// Импортируем созданный в отдельный файлах рутеры.
const mainRouter = require('./routes/main');
const userRouter = require('./routes/user');
const toursRouter = require('./routes/tours');

const port = (process.env.PORT ?? 3001);

// schedule.scheduleJob('37 23 * * *', () => seed());

app.use(logger('dev'));
app.use(cors({
  origin: true,
  credentials: true,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
}));
app.use(express.urlencoded({ extended: true }));
/* Подключаем middleware, которое позволяет читать переменные JavaScript,
сохранённые в формате JSON в body HTTP-запроса. */
app.use(express.json());

app.use(session({
  store: new FileStore(),
  key: 'sid',
  secret: 'heat',
  resave: true,
  saveUninitialized: false,
  cookie: { expires: 1000 * 60 * 60 * 12 },
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
// initialize passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/google/redirect',
  }, (accessToken, refreshToken, profile, done) => {
    // check if user already exists in our own db
    User.findOne({ 'tokens.googleId': profile.id }).then((currentUser) => {
      if (currentUser) {
        // already have this user
        done(null, currentUser);
      } else {
        // if not, create user in our db
        new User({
          'tokens.googleId': profile.id,
          login: profile.displayName,
          img: profile.photos[0].value,
          email: profile.emails[0].value,
        }).save().then((newUser) => {
          done(null, newUser);
        });
      }
    });
  }),
);

/* Подключаем middleware morgan с режимом логирования "dev",
чтобы для каждого HTTP-запроса на сервер в консоль выводилась информация об этом запросе. */
// app.set('trust proxy', 1)
// app.use(cookieParser());
/* Подключаем middleware, которое сообщает epxress,
что в папке "ПапкаПроекта/public" будут находится статические файлы,
т.е. файлы доступные для скачивания из других приложений. */
app.use(express.static(path.join(process.env.PWD, 'public')));
/* Подключаем middleware, которое позволяет читать содержимое
body из HTTP-запросов типа POST, PUT и DELETE. */
// Подключаем middleware, которое задает прамметры сесии пользователей.
// Переход на ручки.
app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/tours', toursRouter);

// path.join(__dirname, '../', 'frontend', 'build');
// app.use(express.static(root));
// app.get('*', (req, res) => {
//   res.sendFile('index.html', { root });
// });
// Запуск сервера и подключение к бд.
app.listen(port, async () => {
  console.log(`Server online on port ${port}!`);
  await connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log('Database online!');
});
