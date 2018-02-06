const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');
const router = require('./config/routes');

const app = express();

// To log all HTTP requests
app.use(morgan('dev'));

// To parse HTTP requests' bodies in req.body
app.use(bodyParser.json({type: 'application/*'}));
app.use(bodyParser.urlencoded({ extended: true }));

// Error handler
app.use((err, req, res, next) => {
  if (err && err.statusCode === 400 && err.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'Could not decode request: JSON parsing failed'
    });
  }
  next();
});

// Allows cross-origin requests from the specified url
const corsOptions = {
  origin: 'https://codingchallenge.nine.com.au/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// To use the available routes in the router
app.use(router);

// App started on specified port
app.listen(config.port, () => console.log(`Express started on port: ${config.port}`));
