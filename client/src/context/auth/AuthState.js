import React, { useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS,
  AUTH_ERROR,
  USER_LOADED,
} from '../types';

// Create a custom hook to use the auth context

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  return [state, dispatch];
};

// Action creators
// NOTE: These could be moved to a separate file like in redux
// but they remain here for ease of students transitioning

// Load User
export const loadUser = async (dispatch) => {
  try {
    console.log(
      'LOAD axios headers after setAuthToken: ',
      axios.defaults.headers.common['x-auth-token']
    );
    console.log('loadUser localStorage token: ' + localStorage.token);
    const res = await axios.get('/api/auth');
    console.log('loadUser res.data: ', res.data);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log('Auth error');
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const register = async (dispatch, formData) => {
  try {
    const res = await axios.post('/api/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    console.log('register token pre loadUser: ', localStorage.token);

    loadUser(dispatch);
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// Login User
export const login = async (dispatch, formData) => {
  try {
    const res = await axios.post('/api/auth', formData);
    console.log('login res.data: ', res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    console.log(
      'login before loadUser localStorage token: ' + localStorage.token
    );

    loadUser(dispatch);
  } catch (err) {
    console.log('Login fail');
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// Logout
export const logout = (dispatch) => {
  console.log('dispatch LOGOUT');
  dispatch({ type: LOGOUT });
};

// Clear Errors
export const clearErrors = (dispatch) => dispatch({ type: CLEAR_ERRORS });

// AuthState Provider Component

const AuthState = (props) => {
  console.log(
    'AuthState  localStorage token before initialState: ' + localStorage.token
  );

  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  ///////////////////////////////////////////
  // set token for initial app loading
  setAuthToken(state.token);
  console.log(
    'AuthState  localStorage token after setAuthToken: ' + localStorage.token
  );

  // load user on first run or refresh
  if (state.loading) {
    console.log('udri');
    loadUser(dispatch);
  }

  useEffect(() => {
    console.log('useEffect token change');
    console.log(
      'useEffect localStorage token before setAuthToken: ' + localStorage.token
    );

    setAuthToken(state.token);
    console.log(
      'useEffect axios headers after setAuthToken: ',
      axios.defaults.headers.common['x-auth-token']
    );
    console.log(
      'useEffect localStorage token after setAuthToken: ' + localStorage.token
    );
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
