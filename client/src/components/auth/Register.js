import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { register, error, clearErrors } = authContext;

  useEffect(() => {
    // Provjerava samo jel error text, imporvement je da se posalje id po kojem se vidi koji je error
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error]);

  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    password2: '',
    userType: '',
  });
  const { name, surname, email, password, password2, userType } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSelectUserType = (selectedUserType) => {
    setUser({ ...user, userType: selectedUserType });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
        surname,
        email,
        password,
        userType,
      });
    }
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='surname'>Surname</label>
          <input
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
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            minLength={8}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            minLength={8}
            required
          />
        </div>
        <div className='form-group'>
          <label>User Type</label>
          <div>
            <button
              type='button'
              className={`btn ${
                userType === '0' ? 'btn-primary' : 'btn-light'
              }`}
              onClick={() => onSelectUserType('0')}
            >
              Student
            </button>
            <button
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
