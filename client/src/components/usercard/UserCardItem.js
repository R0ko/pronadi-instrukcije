import React from 'react';

const UserCardItem = ({ userCard }) => {
  const { id, name, type, surname } = userCard;
  const { price, numberofInstructions, subjects } = userCard.instructorData;
  return (
    // Napravit kak zelis da izgleda usercard
    <div className='usercard-row'>
      <a href='/'>
        {name} {surname}
      </a>
      <h3 className='price'>
        {price} {'€'}
      </h3>
      <h3>{numberofInstructions}</h3>
      <h3>{subjects}</h3>
    </div>
  );
};

export default UserCardItem;
