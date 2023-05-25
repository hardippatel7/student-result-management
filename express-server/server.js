//The process.env.NODE_ENV variable is set to the default 'development‘
//value if itdoesn 't exist.
// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// Load the module dependencies
var mongoose = require('./config/mongoose'),
    express = require('./config/express');

var db = mongoose();

var app = express();

app.listen(5000);

module.exports = app;
console.log('Server running at http://localhost:5000/');
