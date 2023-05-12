import React, { useContext, useRef, useEffect } from 'react';
import UserCardContext from '../../context/userCard/userCardContext';

const UserCardFilter = () => {
  const userCardContext = useContext(UserCardContext);
  const text = useRef('');

  const { filterUserCards, clearFilter, filtered } = userCardContext;

  useEffect(() => {
    if (filtered == null) {
      text.current.value = '';
    }
  }, [filtered]);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterUserCards(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Trazim instrukcije iz...'
        onChange={onChange}
      />
    </form>
  );
};

export default UserCardFilter;
