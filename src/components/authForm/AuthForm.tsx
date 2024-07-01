import { FC, useEffect, useState } from 'react';

import CustomInput from '@/components/customInput/Input';
import CheckBox from '@/components/checkBox/CheckBox';
import Error from '@/components/error/Error';
import CloseBig from '@/components/icons/CloseBig';
import IconButton from '@/components/iconButton/IconButton';
import SocialIconColored from '@/components/icons/SocialIconColored';
import Button from '@/components/button/Button';

import { useAppDispatch, useAppSelector } from '@/hooks/redux/redux';

import { login } from '@/store/data/auth/loginThunk';
import { register } from '@/store/data/auth/registerThunk';

import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validatePhone,
} from '@/utils/validation/validation';

import { Props, Errors } from '@components/authForm/types';

import styles from '@components/authForm/authForm.module.scss';

const AuthModal: FC<Props> = ({
  isRegister,
  isOpen,
  onAuthSuccess,
  setIsOpen,
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(!isRegister);
  const [formState, setFormState] = useState<boolean>(!!isRegister);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(isOpen || false);
  const [error, setError] = useState<Errors>({
    firstNameError: '',
    lastNameError: '',
    phoneError: '',
    emailError: 'err',
    passwordError: 'err',
    repeatPasswordError: '',
  });

  const authState = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (formState) {
      setError({
        firstNameError: 'err',
        lastNameError: 'err',
        phoneError: 'err',
        emailError: 'err',
        passwordError: 'err',
        repeatPasswordError: 'err',
      });
    }
  }, [formState]);

  useEffect(() => {
    isOpen !== undefined && setOpened(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (repeatPassword !== password && formState) {
      setError({
        ...error,
        repeatPasswordError: 'Passwords do not match',
      });
    } else {
      setError({
        ...error,
        repeatPasswordError: '',
      });
    }
  }, [repeatPassword]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState) {
      dispatch(
        register({
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
          password: password,
        }),
      ).then(result => {
        if (result.meta.requestStatus === 'fulfilled' && onAuthSuccess) {
          onAuthSuccess();
        }
      });
    } else {
      dispatch(login({ email: email, password: password, rememberMe })).then(
        result => {
          if (result.meta.requestStatus === 'fulfilled' && onAuthSuccess) {
            onAuthSuccess();
          }
        },
      );
    }
  };

  const handleClose = () => {
    setIsOpen && setIsOpen(false);
    setOpened(false);
  };

  return (
    <div
      className={styles['wrapper']}
      style={opened ? { display: 'flex' } : { display: 'none' }}
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
        <form onSubmit={handleSubmit}>
          {formState ? (
            <>
              <CustomInput
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                setError={error =>
                  setError(prev => ({ ...prev, firstNameError: error }))
                }
                staticLabel={{ header: 'First name', label: 'Ivan' }}
                validate={validateFirstName}
              />
              <CustomInput
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                setError={error =>
                  setError(prev => ({ ...prev, lastNameError: error }))
                }
                staticLabel={{ header: 'Last name', label: 'Ivanov' }}
                validate={validateLastName}
              />
              <CustomInput
                type="text"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                setError={error =>
                  setError(prev => ({ ...prev, phoneError: error }))
                }
                staticLabel={{ header: 'Phone', label: '+380983516319' }}
                validate={validatePhone}
              />
              <CustomInput
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                setError={error =>
                  setError(prev => ({ ...prev, emailError: error }))
                }
                staticLabel={{ header: 'Email', label: 'ivan@ivanov.com' }}
                validate={validateEmail}
              />
              <CustomInput
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                setError={error =>
                  setError(prev => ({ ...prev, passwordError: error }))
                }
                staticLabel={{
                  header: 'Password (8 characters minimum)',
                  label: 'Aa1234.!',
                }}
                validate={validatePassword}
              />
              <CustomInput
                type="password"
                value={repeatPassword}
                onChange={e => setRepeatPassword(e.target.value)}
                // setError={error =>
                //   setError(prev => ({ ...prev, emailError: error }))
                // }
                staticLabel={{
                  header: 'Repeat password',
                  label: 'previous password',
                }}
                error={
                  error.repeatPasswordError !== ('err' || '')
                    ? error.repeatPasswordError
                    : ''
                }
                validate={validatePassword}
              />
            </>
          ) : (
            <>
              <CustomInput
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                setError={error =>
                  setError(prev => ({ ...prev, emailError: error }))
                }
                staticLabel={{ header: 'Email', label: 'ivanov@ivan.com' }}
                validate={validateEmail}
              />
              <CustomInput
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                setError={error =>
                  setError(prev => ({ ...prev, passwordError: error }))
                }
                staticLabel={{
                  header: 'Password (8 characters minimum)',
                  label: 'Aa1234.!',
                }}
                validate={validatePassword}
              />
            </>
          )}

          {formState ? (
            <div className={styles['options']}>
              <CheckBox
                label="I agree with Privacy Policy and Terms of Use"
                small
                onChange={() => setChecked(!checked)}
              />
            </div>
          ) : (
            <div className={styles['options']}>
              <CheckBox
                label="Remember me"
                small
                onChange={() => setRememberMe(!rememberMe)}
              />
              <Button
                className="link-gray medium"
                text="Forgot password"
                type="button"
              />
            </div>
          )}
          <Button
            type="submit"
            text={formState ? 'Sign up' : 'Sign In'}
            className="primary medium"
            fullWidth
            isDisabled={
              !!error.emailError ||
              !!error.passwordError ||
              !!error.firstNameError ||
              !!error.lastNameError ||
              !!error.repeatPasswordError ||
              !!error.phoneError ||
              !checked
            }
          />
          <div className={styles['divider']}>
            <p className="regular s">Or</p>
          </div>
          <Button
            type="button"
            text="Sign in with Google"
            className="secondary medium"
            fullWidth
            iconLeft={<SocialIconColored size="small" />}
            onClick={() =>
              console.log(
                !!error.emailError ||
                  !!error.passwordError ||
                  !!error.firstNameError ||
                  !!error.lastNameError ||
                  !!error.repeatPasswordError ||
                  !!error.phoneError ||
                  !checked,
              )
            }
          />
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
