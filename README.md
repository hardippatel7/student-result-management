# Student Result Management System

The Student Result Management System is a web application developed using the MERN (MongoDB, Express, React, Node.js) stack. It provides a platform for managing student results, courses, and student information.

## Developer's Note
I am Hardip Patel, I have created this application and has tried to make it production ready. key things to note:
- Proper coding standards has been followed.
- Commenting has been maintained, any thrid person looking at code would not feel alien.
- Configured production usable parameters and dependencies.
- Configured DB url in .env file in backend and API URL in frontend.
- In github environment variables, added API URL but not the DB url for security reasons.

Improvements needed
- Effective use of virtual field in Student schema could have been done, I could not find any way, need to dig deep into that.
- Further optmizations can be done based on future scalability.
- Tests are missing.
- On Devops side, CI/CD pipelines can be implemented.
## Frontend URL

The application can be accessed on https://student-result-management.netlify.app/. It has been deployed on https://netlify.com on a free subscription.

## Backend API URL

The backend API of the Student Result Management System can be accessed at: [https://student-result-management-zipy.onrender.com/](https://student-result-management-zipy.onrender.com/)
Backend has been deployed on a free subscription on https://rednder.com. They usually take it down if not accessed for a period of time. If you're accessing for the first time, a request to wait a bit longer (Render will initiate the start command and make it live again).

## Models

The Student Result Management System utilizes the following models:

### Result

The `Result` model represents a student's result for a specific course. It contains the following fields:

- `course`: The reference to the `Course` model representing the course for which the result is recorded.
- `student`: The reference to the `Student` model representing the student who achieved the result.
- `score`: The score obtained by the student, represented as a string with values ranging from 'A' to 'F'.

### Course

The `Course` model represents a course offered by the institution. It contains the following fields:

- `courseName`: The name of the course.

### Student

The `Student` model represents a student enrolled in the institution. It contains the following fields:

- `firstName`: The first name of the student.
- `familyName`: The family name (last name) of the student.
- `dateOfBirth`: The date of birth of the student.
- `email`: The email address of the student.
- `fullName`: The virtual field of schema representing a combination of firstName and familyName.
Note: I could not find a way to use this virtual field effectively, Need to dig deep into it. hence, I have added a TODO task to actually utilize virtual field in ResultList. 

## Getting Started

To run the Student Result Management System locally, follow these steps:

1. Clone the repository: `git clone https://github.com/hardippatel7/student-result-management.git`
2. Navigate to the project directory: `cd student-result-management`
3. Install the dependencies:
   - Backend: `cd express-server && npm install`
   - Frontend: `cd react-client && npm install`
4. Start the backend server: `cd express-server && npm start`
5. Start the frontend development server: `cd react-client && npm start`
6. Access the application in your browser at [http://localhost:3000](http://localhost:3000)

## Contributing

Contributions to the Student Result Management System are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
