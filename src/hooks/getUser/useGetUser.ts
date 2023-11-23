import { UserState } from '../../store/slices/user/types';

export const useGetUser = (): UserState | null => {
  const userString = localStorage.getItem('user');

  if (userString) {
    const user = JSON.parse(userString);
    return user;
  } else {
    return null;
  }
};
