require('dotenv').config();
const express = require("express");
const favicon = require('serve-favicon');

//const expressLayouts=require("express-ejs-layouts");
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
//const db = require('./config/db.config');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
// app.use(express.static('public'));

const route = require('./src/routes/router');
app.use('/', route);





// New route for the root path
app.get('/', function(req, res) {
  res.send('Welcome to my app!');
});

app.use(express.static( 'public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.sendFile(__dirname + '/public/404.html');
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }

  // default to plain-text
  res.type('txt').send('Error: Requested resource not found');
});

app.listen(port, function() {
  console.log("Server listening on port " + port);
});
