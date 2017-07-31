'use strict';

const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();
hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.set('view engine', 'hbs');
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', `${log}\n`, (err) => {
    if (err) {
      console.log('Error writing to server.log\n', err);
    }
  });
  next();
});
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
app.use(express.static(path.join(__dirname, '/public')));

// Helpers
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello, World!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
