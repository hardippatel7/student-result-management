const Result = require('mongoose').model('Result');

//Error message function
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

//Adds a result
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

//Gets list of all results
exports.list = async function (req, res) {
    try {
        const results = await Result.find({})
            .populate({         //populate method for selective response.
                path: 'course',
                select: '_id courseName'
            })
            .populate({         //TODO: firstName and familyName to be replaced by virtual field name 'fullName'
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
};
