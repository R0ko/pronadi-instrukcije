import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth, logout } from '../../context/auth/AuthState';
import React, { Fragment } from 'react';

const Navbar = ({ title, icon }) => {
  const [authState, authDispatch] = useAuth();
  const { isAuthenticated } = authState;

  const onLogout = () => {
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

//   return (
//     <nav className='nav'>
//       <Link to='/' className='site-title'>
//         Site Name
//       </Link>
//       <ul>
//         {/* If logged in, show hero page, if not logged in, show search */}
//         <CustomLink to='/search'>Pretrazi</CustomLink>
//         <CustomLink to='/myinstructions'>Moje instrukcije</CustomLink>
//         <CustomLink to='/messages'>Poruke</CustomLink>
//         {/* If logged in, show your profile, if not logged in, open login screen */}
//         <CustomLink to='/profile'>Profil</CustomLink>
//         <CustomLink to='/register'>Register</CustomLink>
//         <CustomLink to='/login'>Login</CustomLink>
//       </ul>
//     </nav>
//   );
// }

// function CustomLink({ to, children, ...props }) {
//   const resolvedPath = useResolvedPath(to);
//   const isActive = useMatch({ path: resolvedPath.pathname, end: true });
//   return (
//     <li className={isActive ? 'active' : ''}>
//       <Link to={to} {...props}>
//         {children}
//       </Link>
//     </li>
//   );
// }
