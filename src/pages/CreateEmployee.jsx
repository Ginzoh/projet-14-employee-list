import { useState } from 'react';
import { Link } from 'react-router-dom';
import { states } from '../data/states';
import TestModal from 'my-modal-lib-pro/dist/index';
import SelectInputCr from '../components/SelectInputCr';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'my-modal-lib-pro/dist/index.css'

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    dob: null,
    startDate: null,
    street: '',
    city: '',
    state: '',
    zip: '',
    department: '',
  });
  const [errors, setErrors] = useState({});

  const maxDob = new Date();
  maxDob.setFullYear(maxDob.getFullYear());

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // States for the SelectInputCr component
  const stateOptions = states.map(state => ({ value: state.abbreviation, label: state.name }));

  const departmentOptions = [
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Legal', label: 'Legal' },
  ];

  const handleChange = (event) => {
    setEmployee({ ...employee, [event.target.name]: event.target.value });
    if (errors[event.target.name]) {
      setErrors({ ...errors, [event.target.name]: null });
    }
  };

  const handleDateChange = (name, date) => {
    setEmployee({ ...employee, [name]: date });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(employee).forEach(key => {
      if (!employee[key] || employee[key] === '') {
        newErrors[key] = 'This field is required.';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const saveEmployee = () => {
    event.preventDefault();
    if (!validateForm()) return;
    const employees = JSON.parse(localStorage.getItem('employees')) || [];

    // Convert dob and startDate to string before pushing to employees
    const employeeToSave = {
      ...employee,
      dob: new Intl.DateTimeFormat('en-US').format(employee.dob),
      startDate: new Intl.DateTimeFormat('en-US').format(employee.startDate)
    };

    employees.push(employeeToSave);
    localStorage.setItem('employees', JSON.stringify(employees));
    setModalIsOpen(true);
  };

  return (
    <>
      <div>
        <div className="title">
          <h1>HRnet</h1>
        </div>
        <div className="employeeContainer">
          <Link to="/employeelist">View Current Employees</Link>
          <h2>Create Employee</h2>
          <form action="#" id="create-employee" onSubmit={saveEmployee}>
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" name="firstName" value={employee.firstName} onChange={handleChange} />
            {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}

            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" name="lastName" value={employee.lastName} onChange={handleChange} />
            {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}

            <label htmlFor="date-of-birth">Date of Birth</label>
            <ReactDatePicker
              id="date-of-birth"
              selected={employee.dob}
              onChange={date => handleDateChange('dob', date)} showMonthDropdown showYearDropdown
              scrollableYearDropdown yearDropdownItemNumber={80} maxDate={maxDob} />
            {errors.dob && <div style={{ color: 'red' }}>{errors.dob}</div>}

            <label htmlFor="start-date">Start Date</label>
            <ReactDatePicker
              id="start-date"
              selected={employee.startDate}
              onChange={date => handleDateChange('startDate', date)} showMonthDropdown
              showYearDropdown scrollableYearDropdown />
            {errors.startDate && <div style={{ color: 'red' }}>{errors.startDate}</div>}

            <fieldset className="address">
              <legend>Address</legend>

              <label htmlFor="street">Street</label>
              <input id="street" name="street" type="text" value={employee.street} onChange={handleChange} />
              {errors.street && <div style={{ color: 'red' }}>{errors.street}</div>}

              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" value={employee.city} onChange={handleChange} />
              {errors.city && <div style={{ color: 'red' }}>{errors.city}</div>}

              <SelectInputCr
                name="state"
                value={employee.state}
                onChange={handleChange}
                label="State"
                errors={errors.state}
                options={stateOptions}
              />
              <label htmlFor="zip-code">Zip Code</label>
              <input id="zip-code" name="zip" type="number" value={employee.zip} onChange={handleChange} />
              {errors.zip && <div style={{ color: 'red' }}>{errors.zip}</div>}
            </fieldset>
            <SelectInputCr
              name="department"
              value={employee.department}
              onChange={handleChange}
              label="Department"
              errors={errors.department}
              options={departmentOptions}
            />
            <div className="button-container">
              <button type='submit'>Save</button>
            </div>
          </form>
        </div>
        <TestModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          Employee Created!
        </TestModal>
      </div>
    </>
  );
}

export default CreateEmployee