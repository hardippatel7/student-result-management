const results = require('../../app/controllers/resultController');

module.exports = function (app) {
    app.route('/api/results')
        .get(results.list)
        .post(results.add);
};
