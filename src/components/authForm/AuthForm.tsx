import { FC, useEffect, useState } from 'react';

import IconButton from '@components/iconButton/IconButton';
import CloseBig from '@components/icons/CloseBig';
import Button from '@components/button/Button';
import Error from '@components/error/Error';
import LoginForm from '@components/authForm/LoginForm';
import RegisterForm from '@components/authForm/RegisterForm';

import { useAppSelector } from '@/hooks/redux/redux';

import { Props } from '@components/authForm/types';

import styles from '@components/authForm/authForm.module.scss';

const AuthForm: FC<Props> = ({
  isOpen,
  onAuthSuccess,
  setIsOpen,
  isRegister,
}) => {
  const [formState, setFormState] = useState<boolean>(!!isRegister);
  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(!!isOpen);
  const authState = useAppSelector(state => state.auth);

  const [formKey, setFormKey] = useState<number>(0);

  const handleClose = () => {
    setInternalIsOpen(false);
    setIsOpen(false);
  };

  useEffect(() => {
    setInternalIsOpen(!!isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (internalIsOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
      setIsOpen(false);
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [internalIsOpen, setIsOpen]);

  const handleAuthSuccess = (formName: string) => {
    if (onAuthSuccess) {
      onAuthSuccess(formName);
    }
    setFormKey(prevKey => prevKey + 1);
  };

  return (
    <div
      className={styles['wrapper']}
      style={internalIsOpen ? { display: 'flex' } : { display: 'none' }}
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
              onClick={handleClose}
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
          <RegisterForm
            onAuthSuccess={handleAuthSuccess}
            reset={!isOpen}
            key={formKey}
          />
        ) : (
          <LoginForm
            onAuthSuccess={handleAuthSuccess}
            reset={!isOpen}
            key={formKey}
          />
        )}
      </div>
    </div>
  );
};

export default AuthForm;
