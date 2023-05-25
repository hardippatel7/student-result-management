import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_BACKEND_URL;

//Component function
const AddResults = () => {

  //State constants
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedScore, setSelectedScore] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    // Fetch courses and students data from the server
    const fetchCoursesAndStudents = async () => {
      try {
        //API calls to backend to get course annd student data to display in dropdown
        const coursesResponse = await axios.get(`${apiUrl}/courses`);
        const studentsResponse = await axios.get(`${apiUrl}/students`);

        //Redefining the states
        setCourses(coursesResponse.data);
        setStudents(studentsResponse.data);
      } catch (error) {
        console.error('Error fetching courses and students:', error);
      }
    };

    fetchCoursesAndStudents();
  }, []);

  //Redefining the states
  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const handleScoreChange = (e) => {
    setSelectedScore(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultData = {
      course: selectedCourse,
      student: selectedStudent,
      score: selectedScore,
    };

    try {
      //API call to backend to insert result data
      const response = await axios.post(`${apiUrl}/results`, resultData);

      if (response.status === 201) {
        // Result added successfully
        setNotification('Result added successfully');
        // Clear the selected values
        setSelectedCourse('');
        setSelectedStudent('');
        setSelectedScore('');
      } else {
        // Error adding result
        setNotification('Error adding result');
      }
    } catch (error) {
      console.error('Error adding result:', error);
      setNotification('Error adding result');
    }
  };

  return (
    <div>
      <h2>Add New Result</h2>
      {notification && <p>{notification}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Course Name:
          <select value={selectedCourse} onChange={handleCourseChange} required>
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Student Name:
          <select value={selectedStudent} onChange={handleStudentChange} required>
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.firstName + ' ' + student.familyName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Score:
          <select value={selectedScore} onChange={handleScoreChange} required>
            <option value="">Select a score</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddResults;
