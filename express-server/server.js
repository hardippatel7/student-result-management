var dotenv = require('dotenv');
dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
    express = require('./config/express');

//Initialize mongoose and express
var db = mongoose();
var app = express();

var port = process.env.PORT || 5000;
app.listen(port);

module.exports = app;
console.log(`Server is running on port ${port}`);
