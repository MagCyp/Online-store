export interface Props extends FormProps {
  isRegister?: boolean;
  isOpen?: boolean;
  setIsOpen(isOpen: boolean): void;
}

export interface FormProps {
  onAuthSuccess?: (formName: string) => void;
  reset?: boolean;
}

export interface Errors {
  firstNameError?: string;
  lastNameError?: string;
  phoneError?: string;
  emailError?: string;
  passwordError?: string;
  repeatPasswordError?: string;
}
