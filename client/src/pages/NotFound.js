import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set the response status to 404
    navigate('/not-found', { replace: true, state: { status: 404 } });
  }, [navigate]);

  return (
    <div>
      <h1>404 - Page not Found</h1>
      {/* Additional content for the not-found page goes here */}
    </div>
  );
};

export default NotFound;
