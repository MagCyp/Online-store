import { ReactNode } from 'react';

export interface Props {
  icon?: ReactNode;
  text: string | number;
  className: string;
  isRating?: boolean;
}
