import React from 'react';

import SignInForm from '../../../components/auth/signInForm/SignInForm';

const SignIn: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Login</h1>
      <SignInForm />
    </div>
  );
};

export default SignIn;
