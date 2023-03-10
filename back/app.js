const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const postRouter = require('./routes/post');
const db = require('./models');
const userRouter = require('./routes/user');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// passport/index.js
const passportConfig = require('./passport');
const globalRouter = require('./routes/global');
const morgan = require('morgan');

db.sequelize
  .sync()
  .then(() => {
    console.log('๐งค db ์ฐ๊ฒฐ ์ฑ๊ณต');
  })
  .catch(console.error);
// passport ์ธํ
passportConfig();

const app = express();

// CORS
app.use(cors({ origin: true, credentials: true }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// cookie
app.use(cookieParser());

app.use(morgan('dev'));

// ๋ก๊ทธ์ธ ๊ด๋ จ ์ธํ
app.use(
  session({
    secret: 'askfjksad@123',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/', globalRouter);

const PORT = 3065;

app.listen(PORT, () => {
  console.log(`๐ฅ ์๋ฒ ์คํ PORT: ${PORT}`);
});
