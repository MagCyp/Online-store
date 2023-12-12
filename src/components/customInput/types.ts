import { ReactNode, HTMLInputTypeAttribute } from 'react';

export type Props = {
  label?: string;
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  iconButtonLeft?: ReactNode;
  iconButtonRight?: ReactNode;
  rightIconClassName?: string;
  leftIconClassName?: string;
  leftIconButtonClick?: () => void;
  rightIconButtonClick?: () => void;
  error?: string;
};
