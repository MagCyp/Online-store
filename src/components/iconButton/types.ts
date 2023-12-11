import { ReactNode } from 'react';

export interface Props {
  className: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  isDisabled?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}
