import { MutableRefObject } from 'react';

export interface Props {
  onClick: () => void;
  isVisible: boolean;
  toggleRef: MutableRefObject<null | HTMLButtonElement>;
}
