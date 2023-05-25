var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
    const db = mongoose.connect(config.db, {
		useUnifiedTopology: true,
		useNewUrlParser: true, 
		}).then(() => console.log('DB Connected!'))
		.catch(err => {
		console.log('DB Connection Error : ' + err);
		});

    require('../app/models/studentModel');
    require('../app/models/courseModel');
    require('../app/models/resultModel');

    return db;
};