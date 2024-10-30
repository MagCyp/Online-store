import { ReactNode, HTMLInputTypeAttribute } from 'react';

export type Props = {
  label?: string | { value: string; onTop: boolean };
  staticLabel?: { header?: string; label: string };
  type: HTMLInputTypeAttribute;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  iconButtonLeft?: ReactNode;
  iconButtonRight?: ReactNode;
  rightIconClassName?: string;
  leftIconClassName?: string;
  leftIconButtonClick?: () => void;
  rightIconButtonClick?: () => void;
  setError?: (error: string) => void;
  validate?: (value: string | undefined) => string;
  error?: string;
};

export interface IInputFields {
  focused: boolean;
  blurred: boolean;
  error: string;
}
