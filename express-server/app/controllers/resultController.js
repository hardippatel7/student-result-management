const Result = require('mongoose').model('Result');

function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.add = async function (req, res) {
    const result = new Result();
    result.course = req.body.course;
    result.student = req.body.student;
    result.score = req.body.score;

    try {
        const response = await result.save();
        res.status(201).send(response);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: getErrorMessage(err)
        });
    }
};

exports.list = async function (req, res) {
    try {
        const results = await Result.find({})
            .populate({
                path: 'course',
                select: '_id courseName'
            })
            .populate({
                path: 'student',
                select: '_id firstName familyName'
            });
        res.status(200).send(results);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: getErrorMessage(err)
        });
    }
    // Result.find({})
    //   .populate('course', 'courseName') // Populate the 'course' field with 'courseName'
    //   .populate('student', 'firstName familyName') // Populate the 'student' field with 'firstName' and 'familyName'
    //   .exec(function (err, results) {
    //     if (err) {
    //       return next(err);
    //     } else {
    //       res.json(results);
    //     }
    //   });
};
