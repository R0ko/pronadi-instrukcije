import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import { useAuth, clearErrors, register } from '../../context/auth/AuthState';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  const { setAlert } = alertContext;

  useEffect(() => {
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors(authDispatch);
    }
  }, [error, isAuthenticated, props.history, setAlert, authDispatch]);

  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    password2: '',
    userType: '0',
  });

  const { name, surname, email, password, password2, userType } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSelectUserType = (selectedUserType) => {
    setUser({ ...user, userType: selectedUserType });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || surname === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register(authDispatch, {
        name,
        surname,
        email,
        password,
        userType,
      });
    }
  };

  if (isAuthenticated) return <Navigate to='/' />;

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Surname</label>
          <input
            id='surname'
            type='text'
            name='surname'
            value={surname}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='8'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            id='password2'
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='8'
          />
        </div>
        <div className='form-group'>
          <label>User Type</label>
          <div>
            <button
              id='studentButton'
              type='button'
              className={`btn ${
                userType === '0' ? 'btn-primary' : 'btn-light'
              }`}
              onClick={() => onSelectUserType('0')}
            >
              Student
            </button>
            <button
              id='instructorButton'
              type='button'
              className={`btn ${
                userType === '1' ? 'btn-primary' : 'btn-light'
              }`}
              onClick={() => onSelectUserType('1')}
            >
              Instructor
            </button>
          </div>
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
