import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import AddStudents from './components/AddStudents';
import StudentsList from './components/StudentsList';
import AddCourses from './components/AddCourses';
import CoursesList from './components/CoursesList';
import AddResults from './components/AddResults';
import ResultsList from './components/ResultsList';

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/add-students" element={<AddStudents/>} />
          <Route path="/students-list" element={<StudentsList/>} />
          <Route path="/add-courses" element={<AddCourses/>} />
          <Route path="/courses-list" element={<CoursesList/>} />
          <Route path="/add-results" element={<AddResults/>} />
          <Route path="/results-list" element={<ResultsList/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
