const courses = require('../../app/controllers/courseController');
//
module.exports = function (app) {
        app.route('/api/courses')
            .get(courses.list)
            .post(courses.create);
            
        app.route('/api/courses/:courseId')
            .delete(courses.delete);
};
