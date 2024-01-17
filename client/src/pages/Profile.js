import React from 'react';
import { useAuth } from '../context/auth/AuthState'; // Adjust the path accordingly

const Profile = () => {
  const [authState] = useAuth();
  const { user } = authState;

  return (
    <div>
      <h2>Welcome, {user && user.name}</h2>
      {/* Additional profile content goes here */}
    </div>
  );
};

export default Profile;
