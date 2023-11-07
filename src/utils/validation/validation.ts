export const isFirstName = {
  required: 'First Name is a required field!',
  pattern: {
    value: /^[A-Za-z]{2,}$/,
    message: 'The first name must contain at least 2 English characters',
  },
};

export const isLastName = {
  required: 'Last Name is a required field!',
  pattern: {
    value: /^[A-Za-z]{2,}$/,
    message: 'The last name must contain at least 2 English characters',
  },
};

export const isPhone = {
  required: 'Phone is a required field!',
  pattern: {
    value: /^\+380\d{9}$/,
    message: 'The phone number must start with +380 and contain 9 characters',
  },
};

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
