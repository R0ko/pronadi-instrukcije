import { Link, useResolvedPath, useMatch } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='nav'>
      <Link to='/' className='site-title'>
        Site Name
      </Link>
      <ul>
        {/* If logged in, show hero page, if not logged in, show search */}
        <CustomLink to='/search'>Pretrazi</CustomLink>
        <CustomLink to='/myinstructions'>Moje instrukcije</CustomLink>
        <CustomLink to='/messages'>Poruke</CustomLink>
        {/* If logged in, show your profile, if not logged in, open login screen */}
        <CustomLink to='/profile'>Profil</CustomLink>
        <CustomLink to='/register'>Register</CustomLink>
        <CustomLink to='/login'>Login</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
