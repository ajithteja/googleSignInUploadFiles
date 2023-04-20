import Cookies from 'js-cookie';

export const saveUserTokenToLocalStorage = (token) => {
  Cookies.set('jwtToken', token, { expires: 30 });
};

export const getTokenFromLocalStorage = () => {
  const jwtToken = Cookies.get('jwtToken');

  return jwtToken;
};

// export const removeTokenFromLocalStorage = () => {
//   Cookies.remove('jwtToken');
// };
