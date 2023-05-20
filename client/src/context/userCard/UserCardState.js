import React, { useReducer } from 'react';
import axios from 'axios';
import UserCardContext from './userCardContext';
import UserCardReducer from './userCardReducer';
import {
  FILTER_USERCARDS,
  CLEAR_FILTER,
  GET_USERCARDS,
  CLEAR_USERCARDS,
  USERCARD_ERROR,
} from '../types';

const UserCardState = (props) => {
  const initialState = {
    userCards: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(UserCardReducer, initialState);

  // Get Usercards
  const getUserCards = async () => {
    try {
      const res = await axios.get('/api/users');
      const instructorData = res.data.filter((user) => user.userType === 1);

      dispatch({
        type: GET_USERCARDS,
        payload: instructorData,
      });
    } catch (err) {
      dispatch({
        type: USERCARD_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Filter Users
  const filterUserCards = (text) => {
    dispatch({ type: FILTER_USERCARDS, payload: text });
  };

  //Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // Clear UserCards
  const clearUserCards = () => {
    dispatch({ type: CLEAR_USERCARDS });
  };

  return (
    <UserCardContext.Provider
      value={{
        userCards: state.userCards,
        filtered: state.filtered,
        filterUserCards,
        clearFilter,
        getUserCards,
        clearUserCards,
      }}
    >
      {props.children}
    </UserCardContext.Provider>
  );
};

export default UserCardState;
