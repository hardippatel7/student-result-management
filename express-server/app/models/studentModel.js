// Load the module dependencies
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

var StudentSchema = new Schema({
	  firstName: {
		type: String,
		required: [true, "Please add a first name"],
	  },
	  familyName: {
		type: String,
		required: [true, "Please add a family name"],
	  },
	  dateOfBirth: {
		type: Date,
		required: [true, "Please add a birth date"],
		validate: {
			validator: function (dateOfBirth) {
			  // Check if dateOfBirth is a valid date
			  if (isNaN(Date.parse(dateOfBirth))) {
				return false;
			  }
	  
			  // Calculate age based on the date of birth
			  const today = new Date();
			  const age = today.getFullYear() - dateOfBirth.getFullYear();
	  
			  // Check if the student is at least 10 years old
			  return age >= 10;
			},
			message: 'Student must be at least 10 years old',
		  },
	  },
	  email: {
		type: String,
		required: [true, "Please add an email"],
		unique: [true, "Email must be unique"],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
	  }
});

StudentSchema.virtual('fullName').get(function () {
	return this.firstName + ' ' + this.familyName;
  });

mongoose.model('Student', StudentSchema);