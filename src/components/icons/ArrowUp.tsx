import { FC } from 'react';

import { sizes, Props } from '@components/icons/types';

const ArrowUp: FC<Props> = ({ size }) => {
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
        d="M5 15L12 8L19 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowUp;
