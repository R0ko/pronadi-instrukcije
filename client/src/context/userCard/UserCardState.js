import React, { useReducer } from 'react';
import uuid from 'uuid';
import userCardContext from './userCardContext';
import userCardReducer from './userCardReducer';
import {
  ADD_USERCARD,
  DELETE_USERCARD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_USERCARD,
  FILTER_USERCARDS,
  CLEAR_FILTER,
} from '../types';

const UserCardState = (props) => {
  const initialState = {
    userCards: [
      {
        name: 'testni',
        surname: 'instruktor',
        email: 'testniinstruktor@gmail.com',
        userType: '2',
      },
      {
        name: 'testni',
        surname: 'instruktor2',
        email: 'testniinstruktor2@gmail.com',
        userType: '2',
      },
      {
        name: 'testni',
        surname: 'instruktor2',
        email: 'testniinstruktor2@gmail.com',
        userType: '2',
      },
    ],
  };

  const [state, dispatch] = useReducer(userCardReducer, initialState);

  //Add User
  //Delete USer
  //Set Current User
  //Clear Current User
  //Update User
  //Filter Users
  //Clear Users

  return (
    <userCardContext.Provider value={{ userCards: state.userCards }}>
      {props.children}
    </userCardContext.Provider>
  );
};

export default UserCardState;
