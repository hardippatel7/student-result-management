import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Student Result Management System</h1>
      <p>This is the home page of the application.</p>
      <nav>
      <ul>
        <li>
          <Link to="/add-students">Add New Students</Link>
        </li>
        <li>
          <Link to="/students-list">Students List</Link>
        </li>
        <li>
          <Link to="/add-courses">Add New Courses</Link>
        </li>
        <li>
          <Link to="/courses-list">Courses List</Link>
        </li>
        <li>
          <Link to="/add-results">Add New Results</Link>
        </li>
        <li>
          <Link to="/results-list">Results List</Link>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default Home;
