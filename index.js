const express = require('express');
const cors = require('cors');
const session = require('express-session');
const parseurl = require('parseurl');
const store = new session.MemoryStore();
require('dotenv').config();

const rotas = require('./rotas');
const app = express();

app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: false,
  store
}));

app.use(express.json());
app.use(rotas);

app.use('/public', express.static('public'));
app.use('/views', express.static('views'));

// Server setup
app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log(`Unity: http://localhost:${process.env.HTTP_PORT}`);
});