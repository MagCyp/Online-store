import axios from 'axios';

export const isAuth = async () => {
  const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');

  if (jwt) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      return response;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};
