export const isEmail = {
  required: 'Email is a required field!',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Please enter a valid email address',
  },
};
export const isPassword = {
  required: 'Password is a required field!',
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message:
      'Password must be at least 8 characters and contain at least one letter and one number',
  },
};
