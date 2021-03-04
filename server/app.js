const express = require('express');
const { connect } = require('mongoose');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();

// Создаем приложение express.
const app = express();
// Импортируем созданный в отдельный файлах рутеры.
const mainRouter = require('./routes/main');
const userRouter = require('./routes/user');

const port = (process.env.PORT ?? 3001);

/* Подключаем middleware morgan с режимом логирования "dev",
чтобы для каждого HTTP-запроса на сервер в консоль выводилась информация об этом запросе. */
app.use(logger('dev'));
app.use(cors());
// app.set('trust proxy', 1)
app.use(cookieParser());
/* Подключаем middleware, которое сообщает epxress,
что в папке "ПапкаПроекта/public" будут находится статические файлы,
т.е. файлы доступные для скачивания из других приложений. */
app.use(express.static(path.join(process.env.PWD, 'public')));
/* Подключаем middleware, которое позволяет читать содержимое
body из HTTP-запросов типа POST, PUT и DELETE. */
app.use(express.urlencoded({ extended: true }));
/* Подключаем middleware, которое позволяет читать переменные JavaScript,
сохранённые в формате JSON в body HTTP-запроса. */
app.use(express.json());
// Подключаем middleware, которое задает прамметры сесии пользователей.
app.use(session({
  store: new FileStore(),
  key: 'sid',
  secret: 'heat',
  resave: true,
  saveUninitialized: false,
  cookie: { expires: 1000 * 60 * 60 * 12 },
}));
// Переход на ручки.
app.use('/', mainRouter);
app.use('/user', userRouter);

// Запуск сервера и подключение к бд.
app.listen(port, async () => {
  console.log('Server online!');
  await connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  });
  console.log('Database online!');
});
