export interface Props {
  isRegister?: boolean;
  isOpen?: boolean;
  onAuthSuccess?: () => void;
  setIsOpen?(value: boolean): void;
}

export interface Errors {
  firstNameError?: string;
  lastNameError?: string;
  phoneError?: string;
  emailError?: string;
  passwordError?: string;
  repeatPasswordError?: string;
}
