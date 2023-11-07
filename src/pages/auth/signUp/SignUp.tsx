import { FC } from 'react';

import SignUpForm from '../../../components/auth/signUpForm/SignUpForm';

const SignUp: FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Registration</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
