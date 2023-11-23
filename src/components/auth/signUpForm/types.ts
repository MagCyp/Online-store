export interface UserData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  repeatPassword?: string;
}

export interface CustomError {
  data: string;
  error: string;
}
