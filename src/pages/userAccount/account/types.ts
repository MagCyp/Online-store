export interface UserData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export interface Props {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  onUpdateUserData: (data: UserData) => void;
}
