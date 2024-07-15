/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Props {
  isOpen: boolean;
  setIsOpen(isOpen: boolean): void;
  header: string;
  message: string;
  type: 'error' | 'alert' | 'success';
  firstButtonText?: string;
  firstButtonHref?: string;
  firstButtonVoidClick?: () => void;
  firstButtonReturnClick?: (value: any) => void;
  firstButtonClose?: boolean;
  secondButtonText?: string;
  secondButtonHref?: string;
  secondButtonVoidClick?: () => void;
  secondButtonReturnClick?: (value: any) => void;
  secondButtonClose?: boolean;
}
