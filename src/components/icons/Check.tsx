import { FC } from 'react';

import { sizes, Props } from '@components/icons/types';

const Check: FC<Props> = ({ size }) => {
  const dynamicSize = sizes[size];

  return (
    <svg
      width={dynamicSize}
      height={dynamicSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_576_5010)">
        <path
          d="M5 12L10 17L20 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_576_5010">
          <rect width={dynamicSize} height={dynamicSize} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Check;
