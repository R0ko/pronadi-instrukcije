import React, { useReducer } from 'react';
import uuid from 'uuid';
import UserCardContext from './userCardContext';
import UserCardReducer from './userCardReducer';
import { FILTER_USERCARDS, CLEAR_FILTER } from '../types';

const UserCardState = (props) => {
  const initialState = {
    userCards: [
      {
        id: 1,
        name: 'testni',
        surname: 'instruktor',
        instructorData: {
          price: '6,25',
          numberofInstructions: '0',
          subjects: ['Matematika', 'Hrvatski', 'Engleski'],
        },
        userType: '2',
      },
      {
        id: 2,
        name: 'testni',
        surname: 'instruktor2',
        instructorData: {
          price: '6,25',
          numberofInstructions: '0',
          subjects: ['Glazbeni', 'Hrvatski', 'Engleski'],
        },
        userType: '2',
      },
      {
        id: 3,
        name: 'testni',
        surname: 'instruktor3',
        instructorData: {
          price: '6,25',
          numberofInstructions: '0',
          subjects: ['Glazbeni'],
        },
        userType: '2',
      },
      {
        id: 4,
        name: 'testni',
        surname: 'instruktor4',
        instructorData: {
          price: '6,25',
          numberofInstructions: '0',
          subjects: ['Srpski', 'Slovenski'],
        },
        userType: '2',
      },
      {
        id: 5,
        name: 'testni',
        surname: 'instruktor5',
        instructorData: { price: '6,25', numberofInstructions: '0' },
        userType: '2',
      },
    ],
    filtered: null,
  };

  const [state, dispatch] = useReducer(UserCardReducer, initialState);

  //Add User
  //Delete USer
  //Set Current User
  //Clear Current User
  //Update User

  //Filter Users
  const filterUserCards = (text) => {
    dispatch({ type: FILTER_USERCARDS, payload: text });
  };
  //Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <UserCardContext.Provider
      value={{
        userCards: state.userCards,
        filtered: state.filtered,
        filterUserCards,
        clearFilter,
      }}
    >
      {props.children}
    </UserCardContext.Provider>
  );
};

export default UserCardState;
