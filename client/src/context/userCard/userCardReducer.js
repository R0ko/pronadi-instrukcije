import { FILTER_USERCARDS, CLEAR_FILTER, GET_USERCARDS } from '../types';

const UserCardReducer = (state, action) => {
  switch (action.type) {
    case GET_USERCARDS:
      return {
        ...state,
        userCards: action.payload,
        loading: false,
      };
    case FILTER_USERCARDS:
      return {
        ...state,
        filtered: state.userCards.filter((userCard) => {
          const subjects =
            userCard.instructorData && userCard.instructorData.subjects
              ? userCard.instructorData.subjects
              : [];

          const lowercaseSubjects = subjects.map((subject) =>
            subject.toLowerCase()
          );

          return lowercaseSubjects.some((subject) =>
            subject.includes(action.payload.toLowerCase())
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
};

export default UserCardReducer;
