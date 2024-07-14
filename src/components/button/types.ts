import { ReactNode, CSSProperties as ReactCSSProperties } from 'react';

export type Props = {
  className: string;
  text: string | undefined;
  type: 'button' | 'submit' | 'reset' | undefined;
  isDisabled?: boolean;
  isHidden?: boolean;
  icon?: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  onClick?: () => void;
  onClickEvent?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  fullWidth?: boolean;
  style?: ReactCSSProperties;
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
