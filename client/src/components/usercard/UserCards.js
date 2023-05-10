import React, { Fragment, useContext } from 'react';
import UserCardItem from './UserCardItem';
import userCardContext from '../../context/userCard/userCardContext';

const UserCards = () => {
  const userContext = useContext(userCardContext);

  const { userCards } = userContext;

  return (
    <div>
      <Fragment>
        {userCards.map((userCard) => (
          <h3>
            <UserCardItem key={userCard.id} userCard={userCard} />
          </h3>
        ))}
      </Fragment>
    </div>
  );
};

export default UserCards;
