import React, { useState } from 'react';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_BACKEND_URL;

//Component function
const AddCourses = () => {

  //State constants
  const [courseName, setCourseName] = useState('');
  const [notification, setNotification] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (courseName) {

      const courseData = {
        courseName
      };
      axios.post(`${apiUrl}/courses`, courseData).then((result) => {
        console.log(result);
        if (result.status === 201) {
          setNotification('New course added successfully.');
          setCourseName('');
        }
        else {
          setNotification('Error in saving new Course : ' + result.data.message);
        }
      })
    } else {
      setNotification('Please fill in course name.');
    }
  };

  return (
    <div>
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {notification && <p>{notification}</p>}
    </div>
  );
};

export default AddCourses;
