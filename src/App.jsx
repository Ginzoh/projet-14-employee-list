import { useState, useEffect } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEmployee from './pages/CreateEmployee';
import EmployeeList from './pages/EmployeeList';
import employeesData from './data/employees.json';

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Initialize the employees state with data from the JSON file
    setEmployees(employeesData);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateEmployee employees={employees} setEmployees={setEmployees} />} />
        <Route path="/employeelist" element={<EmployeeList employees={employees} />} />
      </Routes>
    </Router>
  );
}

export default App;
