import { ReactNode } from 'react';

export type Props = {
  className: string;
  text: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  isDisabled?: boolean;
  isHidden?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  onClick?: () => void;
  href?: string;
  fullWidth?: boolean;
};

export type CSSProperties = {
  visibility?:
    | 'visible'
    | 'hidden'
    | 'collapse'
    | 'initial'
    | 'inherit'
    | undefined;
  width?: string | undefined;
};
