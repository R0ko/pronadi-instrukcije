import axios from 'axios';

const setAuthToken = (token) => {
  console.log('setAuthToken token: ' + token);
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
    console.log('setAuthToken localStorage token: ' + localStorage.token);
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
