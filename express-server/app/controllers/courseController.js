const mongoose = require('mongoose');
const Course = mongoose.model('Course');

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

//Creates a course
exports.create = async function (req, res) {
    const course = new Course();
    course.courseName = req.body.courseName;

    try {
        const response = await course.save();
        res.status(201).send(response);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: getErrorMessage(err)
        });
    }
};

//Gets list of all courses
exports.list = async function (req, res, next) {
    try {
        const courses = await Course.find({});
        res.send(courses);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: getErrorMessage(err)
        });
    }
};

//Deletes a course based on courseId
exports.delete = async function (req, res) {
    try {
        const courseId = req.params.courseId;
        const deletedCourse = await Course.findOneAndDelete({ _id: courseId });
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: getErrorMessage(err)
        });
    }
};

