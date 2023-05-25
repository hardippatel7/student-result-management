import React, { useState } from 'react';
import axios from 'axios';
import './AddStudents.css';
const apiUrl = process.env.REACT_APP_BACKEND_URL;

//Component function
const AddStudents = () => {

  //State constants
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all controls are filled
    if (firstName && familyName && dateOfBirth && email) {
      // Validate email address
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        setNotification('Please enter a valid email address.');
        return;
      }

      // Validate date of birth
      const today = new Date();
      const dob = new Date(dateOfBirth);
      const age = today.getFullYear() - dob.getFullYear();
      if (isNaN(dob.getTime()) || age < 10) {
        setNotification('Please enter a valid date of birth (minimum age: 10 years).');
        return;
      }

      const studentData = {
        firstName,
        familyName,
        dateOfBirth,
        email,
      };
      axios.post(`${apiUrl}/students`, studentData).then((result) => {
        console.log(result);
        if (result.status === 201) {
          setNotification('New student added successfully.');
          setFirstName('');
          setFamilyName('');
          setDateOfBirth('');
          setEmail('');
        }
        else {
          setNotification('Error in saving new Student : ' + result.data.message);
        }

      })

    } else {
      setNotification('Please fill in all the fields.');
    }
  };

  return (
    <div className="add-student-container">
      <h2>Add New Students</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="familyName">Family Name:</label>
          <input
            type="text"
            id="familyName"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {notification && <p className="notification">{notification}</p>}
    </div>
  );
};

export default AddStudents;
