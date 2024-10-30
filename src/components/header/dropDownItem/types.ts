import { ReactNode } from 'react';

export interface Props {
  icon?: ReactNode;
  text: string;
  href: string;
  isNew?: boolean;
  listItem?: boolean;
  onClick?: () => void;
}
