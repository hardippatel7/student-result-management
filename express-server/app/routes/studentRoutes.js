var students = require('../../app/controllers/studentController');

module.exports = function (app) {

    app.route('/api/students')
        .get(students.list)
        .post(students.create);

    app.route('/api/students/:studentId')
        .delete(students.delete);

};

