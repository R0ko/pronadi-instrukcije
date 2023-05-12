import React, { Fragment, useContext } from 'react';
import UserCardItem from './UserCardItem';
import UserCardContext from '../../context/userCard/userCardContext';

const UserCards = () => {
  const userContext = useContext(UserCardContext);

  const { userCards, filtered } = userContext;

  return (
    <div className='user-list'>
      <Fragment>
        {filtered !== null
          ? filtered.map((userCard) => (
              <UserCardItem key={userCard.id} userCard={userCard} />
            ))
          : userCards.map((userCard) => (
              <UserCardItem key={userCard.id} userCard={userCard} />
            ))}
      </Fragment>
    </div>
  );
};

export default UserCards;
