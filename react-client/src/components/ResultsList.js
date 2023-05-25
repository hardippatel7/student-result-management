import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_BACKEND_URL;

//Component function
const ListResults = () => {

  //State constant
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch results data from the server
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${apiUrl}/results`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div>
      <h2>Results List</h2>
      <table className="results-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Student</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result._id}>
              <td>{result.course.courseName}</td>
              <td>{result.student.firstName + ' ' + result.student.familyName}</td>
              <td>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListResults;
