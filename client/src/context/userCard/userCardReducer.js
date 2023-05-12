import { FILTER_USERCARDS, CLEAR_FILTER } from '../types';

const UserCardReducer = (state, action) => {
  switch (action.type) {
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
