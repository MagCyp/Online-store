import { FC } from 'react';

import { sizes, Props } from '@components/icons/types';

const RadioButtonOn: FC<Props> = ({ size }) => {
  const dynamicSize = sizes[size];

  return (
    <svg
      width={dynamicSize}
      height={dynamicSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22.6667C17.891 22.6667 22.6667 17.891 22.6667 12C22.6667 6.10896 17.891 1.33333 12 1.33333C6.10896 1.33333 1.33333 6.10896 1.33333 12C1.33333 17.891 6.10896 22.6667 12 22.6667ZM12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill="white"
      />
      <path
        d="M18.6668 12C18.6668 15.6819 15.6821 18.6666 12.0002 18.6666C8.31826 18.6666 5.3335 15.6819 5.3335 12C5.3335 8.31808 8.31826 5.33331 12.0002 5.33331C15.6821 5.33331 18.6668 8.31808 18.6668 12Z"
        fill="white"
      />
    </svg>
  );
};

export default RadioButtonOn;
