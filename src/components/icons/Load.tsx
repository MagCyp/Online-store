import { FC } from 'react';

import { sizes, Props } from '@components/icons/types';

const Load: FC<Props> = ({ size }) => {
  const dynamicSize = sizes[size];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dynamicSize}
      height={dynamicSize}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18.364 18.364C16.7353 19.9927 14.4853 21 12 21C7.02945 21 3 16.9706 3 12C3 7.02945 7.02945 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63605C19.193 6.46505 21 8.5 21 8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 4V8.5H16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Load;
