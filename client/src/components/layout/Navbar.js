import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth, logout } from '../../context/auth/AuthState';
import React, { Fragment, useContext } from 'react';
import UserCardContext from '../../context/userCard/userCardContext';

const Navbar = ({ title, icon }) => {
  const [authState, authDispatch] = useAuth();
  const { isAuthenticated } = authState;
  const userCardContext = useContext(UserCardContext);
  const { clearUserCards } = userCardContext;

  const onLogout = () => {
    clearUserCards();
    logout(authDispatch);
  };

  const authLinks = (
    <Fragment>
      <li>
        <Link to='/profile'>Profile</Link>
      </li>
      <li>
        <Link to='/search'>Pretrazi</Link>
      </li>
      <li>
        <Link to='/myinstructions'>Moje Instrukcije</Link>
      </li>
      <li>
        <Link to='/messages'>Poruke</Link>
      </li>
      <li>
        <Link onClick={onLogout} to='/login'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Profile</Link>
      </li>
      <li>
        <Link to='/register'>Pretrazi</Link>
      </li>
      <li>
        <Link to='/register'>Moje Instrukcije</Link>
      </li>
      <li>
        <Link to='/register'>Poruke</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/'>
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Pronadi Instrukcije',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
