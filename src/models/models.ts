export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegisterData extends UserLoginData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  repeatPassword?: string;
}

export interface CustomError {
  data: string;
  error: string;
}
