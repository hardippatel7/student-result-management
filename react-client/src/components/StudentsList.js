import React, { useState, useEffect } from 'react';
import './StudentsList.css';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

//Component function
const StudentsList = () => {

  //State constant
  const [students, setStudents] = useState([]);

  // Fetch the list of students from the server
  useEffect(() => {
    // Make an API call or fetch the students data from the server
    // and update the 'students' state with the response
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${apiUrl}/students`);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  // Handle student deletion
  const handleDelete = async (studentId) => {
    try {
      // Make an API call to delete the student from the server
      await fetch(`${apiUrl}/students/${studentId}`, {
        method: 'DELETE',
      });

      // Update the 'students' state by removing the deleted student
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== studentId)
      );
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="students-list-container">
      <h2>Students List</h2>
      <table className="students-table">
        <thead>
          <tr>
            <th>Name & Family Name</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{`${student.firstName} ${student.familyName}`}</td>
              <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => handleDelete(student._id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsList;
