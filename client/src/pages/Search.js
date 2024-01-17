import React from 'react';
import UserCards from '../components/usercard/UserCards';
import UserCardFilter from '../components/usercard/UserCardFilter';

const Search = () => {
  return (
    <div className='grid-2'>
      <div className='user-column'>
        <UserCardFilter />
        <UserCards />
      </div>
    </div>
  );
};

export default Search;
