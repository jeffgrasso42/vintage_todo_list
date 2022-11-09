const { strict } = require('assert');
const express = require('express');
const session = require('express-session');
require('dotenv').config();
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controls');

const app = express();
const PORT = process.env.PORT || 3000;

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
});
