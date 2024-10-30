import { FC } from 'react';

import { sizes, Props } from '@components/icons/types';

const Chair: FC<Props> = ({ size }) => {
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
        d="M7.5 14V7.8261C7.5 6.5 9 5 12 5C15 5 16.5 6.5 16.5 7.8261V14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M6 17V14H18V17H6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 2H14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4 8V14H20V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 21.5H15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 17V21.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 2V5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Chair;
