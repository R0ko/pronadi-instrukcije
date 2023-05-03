import { Link, useResolvedPath, useMatch } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='nav'>
      <Link to='/' className='site-title'>
        Site Name
      </Link>
      <ul>
        <CustomLink to='/home'>Pocetna</CustomLink>
        <CustomLink to='/login'>Prijava</CustomLink>
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
