import React from 'react';

const UserCardItem = ({ userCard }) => {
  const { id, name, type } = userCard;
  const { price, numberofInstructions } = userCard.instructorData;
  return (
    // Napravit kak zelis da izgleda usercard
    <div className='card bg=light'>
      <h3 className='text-primary text-left'>{price}</h3>
    </div>
  );
};

export default UserCardItem;
