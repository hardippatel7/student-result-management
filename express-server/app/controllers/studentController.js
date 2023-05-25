// Load the module dependencies
const Student = require('mongoose').model('Student');

function getErrorMessage(err) {
    // If an internal MongoDB error occurs get the error message
	if (err.code) {
		switch (err.code) {
			// If a unique index error occurs set the message error
			case 11000:
			case 11001:
				return 'Student with this email already exists';
			// If a general error occurs set the message error
			default:
				return 'Something went wrong';
		}
	} else {
		// Grab the first error message from a list of possible errors
		for (const errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}
};

exports.create = async function (req, res, next) {
	const student = new Student();
    student.firstName = req.body.firstName;
	student.familyName = req.body.familyName;
	student.dateOfBirth = req.body.dateOfBirth;
	student.email = req.body.email;

    try {
        const response = await student.save();
        res.status(201).send(response);
    } catch (err) {
        console.log(err);
        res.status(400).send({
            message: getErrorMessage(err)
        });
    }
};

// Returns all students
exports.list = async function (req, res) {
    try {
        const students = await Student.find({ });
        res.status(200).send(students);
      } catch (err) {
        console.log(err);
        res.status(400).send({
            message: getErrorMessage(err)
        });
      }
};

// exports.getNames = function (req, res, next) {
// 	Student.find({}, function (err, students) {
// 	  if (err) {
// 		return next(err);
// 	  } else {
// 		const transformedStudents = students.map(student => {
// 		  return student.toJSON({ virtuals: true });
// 		});
  
// 		res.send(transformedStudents);
// 	  }
// 	});
//   };

// Delete a student by id
exports.delete = async function (req, res) {
    try {
        const studentId = req.params.studentId;
        const deletedStudent = await Student.findOneAndDelete({ _id: studentId });
        if (!deletedStudent) {
          return res.status(404).json({ message: 'Student not found' });
        }
    
        res.status(200).json({ message: 'Student deleted successfully' });
      } catch (err) {
        console.log(err);
        res.status(400).send({
            message: getErrorMessage(err)
        });
      }
};