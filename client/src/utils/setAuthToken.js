import axios from 'axios';

const setAuthToken = (token) => {
  console.log('setAuthToken token: ' + token);
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
    console.log('setAuthToken localStorage token: ' + localStorage.token);
  } else {
    console.log('delete token');
    delete axios.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token', token);
  }
};

export default setAuthToken;
