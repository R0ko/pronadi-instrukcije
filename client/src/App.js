import './App.css';
import Navbar from './components/layout/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Search from './pages/Search';
import MyInstructions from './pages/MyInstructions';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

import UserCardState from './context/userCard/UserCardState';

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <div className='container'>
        <UserCardState>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/myinstructions' element={<MyInstructions />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </UserCardState>
      </div>
    </div>
  );
};

export default App;

// {/* If logged in, show hero page, if not logged in, show search */}
// <CustomLink to='/search'>Pretrazi</CustomLink>
// <CustomLink to='/myinstructions'>Moje instrukcije</CustomLink>
// <CustomLink to='/messages'>Poruke</CustomLink>
// {/* If logged in, show your profile, if not logged in, open login screen */}
// <CustomLink to='/profile'>Profil</CustomLink>
