const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controls');
const { create } = require('express-handlebars');

const app = express();
const hbs = create({
  mainLayout: 'main.handlebars',
});
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

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  '/assets/css/base/',
  express.static(path.join(__dirname, 'node_modules', 'xp.css', 'dist'))
);
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
});
