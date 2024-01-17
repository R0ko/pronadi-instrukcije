import React, { Fragment, useContext, useEffect } from 'react';
import UserCardItem from './UserCardItem';
import UserCardContext from '../../context/userCard/userCardContext';
import Spinner from '../layout/Spinner';

const UserCards = () => {
  const userContext = useContext(UserCardContext);

  const { userCards, filtered, getUserCards, loading } = userContext;

  useEffect(() => {
    getUserCards();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='user-list'>
      <Fragment>
        {userCards !== null && !loading ? (
          filtered !== null ? (
            filtered.map((userCard) => (
              <UserCardItem key={userCard.id} userCard={userCard} />
            ))
          ) : (
            userCards.map((userCard) => (
              <UserCardItem key={userCard.id} userCard={userCard} />
            ))
          )
        ) : (
          <Spinner />
        )}
      </Fragment>
    </div>
  );
};

export default UserCards;
