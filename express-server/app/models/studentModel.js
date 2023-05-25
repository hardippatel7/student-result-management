const mongoose = require('mongoose');

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
		//Already added the validations on frontend itself but it is strongly advised 
		//to add it at entity/document level as well
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

//Virtual field to be used in Result
StudentSchema.virtual('fullName').get(function () {
	return this.firstName + ' ' + this.familyName;
});

mongoose.model('Student', StudentSchema);