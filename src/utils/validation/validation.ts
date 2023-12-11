export const validateFirstName = (value: string | undefined): string => {
  if (!value) return 'First Name is a required field!';
  if (!/^[A-Za-z]{2,}$/.test(value))
    return 'The first name must contain at least 2 English characters';
  return '';
};

export const validateLastName = (value: string | undefined): string => {
  if (!value) return 'Last Name is a required field!';
  if (!/^[A-Za-z]{2,}$/.test(value))
    return 'The last name must contain at least 2 English characters';
  return '';
};

export const validatePhone = (value: string | undefined): string => {
  if (!value) return 'Phone is a required field!';
  if (!/^\+380\d{9}$/.test(value))
    return 'The phone number must start with +380 and contain 9 characters';
  return '';
};

export const validateEmail = (value: string | undefined): string => {
  if (!value) return 'Email is a required field!';
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
    return 'Please enter a valid email address';
  return '';
};

export const validatePassword = (value: string): string => {
  if (!value) return 'Password is a required field!';
  if (!/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value))
    return 'Password must be at least 8 characters and contain at least one letter and one number';
  return '';
};

export const validateRepeatPassword = (
  password: string,
  repeatPassword: string | undefined,
): string => {
  if (!repeatPassword) return 'Confirm Password is a required field!';
  if (password !== repeatPassword) return 'Passwords do not match';
  return '';
};
