import axios from 'axios';

export const isAuth = async (): Promise<boolean> => {
  const jwt = localStorage.getItem('jwt');

  if (jwt) {
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};
