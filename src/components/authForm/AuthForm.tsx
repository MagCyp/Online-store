import { FC, useState } from 'react';

import IconButton from '@components/iconButton/IconButton';
import CloseBig from '@components/icons/CloseBig';
import Button from '@components/button/Button';
import Error from '@components/error/Error';
import LoginForm from '@components/authForm/LoginForm';
import RegisterForm from '@components/authForm/RegisterForm';

import { useAppSelector } from '@/hooks/redux/redux';

import styles from '@components/authForm/authForm.module.scss';

const AuthForm: FC<{
  isOpen: boolean;
  onAuthSuccess: () => void;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ isOpen, onAuthSuccess, setIsOpen }) => {
  const [formState, setFormState] = useState<boolean>(false);
  const authState = useAppSelector(state => state.auth);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={styles['wrapper']}
      style={isOpen ? { display: 'flex' } : { display: 'none' }}
    >
      <div className={styles['container']}>
        <div className={styles['header']}>
          <h5
            className="regular"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            {formState ? 'Create account' : 'Log in'}
            <IconButton
              icon={<CloseBig size="medium" />}
              type="button"
              className="link-gray large"
              onClick={() => handleClose()}
            />
          </h5>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
            <p className="m regular">
              {formState
                ? 'Already have an account?'
                : 'Don’t have an account yet?'}
            </p>
            <Button
              className="link-gray medium"
              text={formState ? 'Log in' : 'Create account'}
              type="button"
              onClick={() => setFormState(!formState)}
            />
          </div>
        </div>
        {authState?.failureReason && (
          <Error bigError message={authState?.failureReason} />
        )}
        {formState ? (
          <RegisterForm onAuthSuccess={onAuthSuccess} />
        ) : (
          <LoginForm onAuthSuccess={onAuthSuccess} />
        )}
      </div>
    </div>
  );
};

export default AuthForm;
