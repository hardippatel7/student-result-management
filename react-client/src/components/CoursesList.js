import React, { useState, useEffect } from 'react';
const apiUrl = process.env.REACT_APP_BACKEND_URL;

//Component function
const CoursesList = () => {

  //State constant
  const [courses, setCourses] = useState([]);

  // Fetch the list of courses from the server
  useEffect(() => {
    // Make an API call or fetch the courses data from the server
    // and update the 'courses' state with the response
    const fetchCourses = async () => {
      try {
        console.log(apiUrl);
        const response = await fetch(`${apiUrl}/courses`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Handle course deletion
  const handleDelete = async (courseId) => {
    try {
      // Make an API call to delete the student from the server
      await fetch(`${apiUrl}/courses/${courseId}`, {
        method: 'DELETE',
      });

      // Update the 'courses' state by removing the deleted course
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div>
      <h2>Courses List</h2>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{`${course.courseName}`}</td>
              <td>
                <button onClick={() => handleDelete(course._id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesList;
