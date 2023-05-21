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
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
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

    setAuthToken(res.data.token);

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
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    setAuthToken(res.data.token);

    loadUser(dispatch);
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// Logout
export const logout = (dispatch) => {
  dispatch({ type: LOGOUT });
};

// Clear Errors
export const clearErrors = (dispatch) => dispatch({ type: CLEAR_ERRORS });

// AuthState Provider Component

const AuthState = (props) => {
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

  // load user on first run or refresh
  if (state.loading) {
    loadUser(dispatch);
  }

  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
