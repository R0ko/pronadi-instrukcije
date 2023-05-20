import './App.css';
import Navbar from './components/layout/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Search from './pages/Search';
import MyInstructions from './pages/MyInstructions';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Register from './components/auth/Register';
import Alerts from './components/layout/Alerts';

import UserCardState from './context/userCard/UserCardState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

const App = () => {
  return (
    <AuthState>
      <UserCardState>
        <AlertState>
          <Navbar />
          <div className='container'>
            <Alerts />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search' element={<Search />} />
              <Route path='/myinstructions' element={<MyInstructions />} />
              <Route path='/messages' element={<Messages />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </AlertState>
      </UserCardState>
    </AuthState>
  );
};

export default App;
