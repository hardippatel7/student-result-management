const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  score: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'E', 'F'],
    required: true,
  },
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
