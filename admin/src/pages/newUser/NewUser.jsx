import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './newUser.css';

export default function NewUser() {
  const initialValues = { firstname: '', lastname: '', username: '', email: '', password: '', confirmPassword: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const error = {};
    setFormErrors(error);
    setIsSubmit(true);
    if (Object.keys(error).length === 0) {
      await axios
        .post('http://localhost:3001/api/register', formValues)
        .then(response => {
          if (response.data.status === 'FAILED') {
            const message = response.data.data;
            for (var key of Object.keys(message)) {
              NotificationManager.error(message[key]);
            }
          } else {
            const message = 'Created new user';
            NotificationManager.success(message);
            setFormValues(initialValues);
          }
        })
        .catch(err => {
          return err;
        });
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors, isSubmit]);

  return (
    <div className='newUser'>
      <h1 className='newUserTitle'>NEW USER</h1>
      <form className='newUserForm' onSubmit={handleSubmit}>
        <div className='newUserItem'>
          <label>First Name</label>
          <input type='text' name='firstname' placeholder='Firstname' value={formValues.firstname} onChange={handleChange} required />
        </div>
        <div className='newUserItem'>
          <label>Last Name</label>
          <input type='text' name='lastname' placeholder='Lastname' value={formValues.lastname} onChange={handleChange} />
        </div>
        <div className='newUserItem'>
          <label>User Name</label>
          <input type='text' name='username' placeholder='Username' value={formValues.username} onChange={handleChange} required />
        </div>
        <div className='newUserItem'>
          <label>Email</label>
          <input type='email' name='email' placeholder='Email' value={formValues.email} onChange={handleChange} required />
        </div>
        <div className='newUserItem'>
          <label>Password</label>
          <input type='password' name='password' placeholder='Password' value={formValues.password} onChange={handleChange} required />
        </div>
        <div className='newUserItem'>
          <label>Confirm Password</label>
          <input type='password' placeholder='Confirm password' name='confirmPassword' value={formValues.confirmPassword} onChange={handleChange} required />
        </div>
        <div className='newUserItem'>
          <label>Gender</label>
          <div className='newUserGender'>
            <input type='radio' name='gender' id='male' value='male' />
            <label for='male'>Male</label>
            <input type='radio' name='gender' id='female' value='female' />
            <label for='female'>Female</label>
            <input type='radio' name='gender' id='other' value='other' />
            <label for='other'>Other</label>
          </div>
        </div>
        <div className='newUserItem'>
          <label>Active</label>
          <select className='newUserSelect' name='active' id='active'>
            <option value='yes'>Yes</option>
            <option value='no'>No</option>
          </select>
        </div>
        <button className='newUserButton'>CREATE</button>
        <NotificationContainer />
      </form>
    </div>
  );
}
