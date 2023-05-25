const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CourseSchema = new Schema({
      courseName: {
        type: String,
        required: [true, "Please add a course name"],
      }
});
mongoose.model('Course', CourseSchema);
