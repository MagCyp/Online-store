import { FC } from 'react';
import { sizes, Props } from '@components/icons/types';

const Minus: FC<Props> = ({ size }) => {
  const dynamicSize = sizes[size];

  return (
    <svg
      width={dynamicSize}
      height={dynamicSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_576_5026)">
        <path
          d="M5 12H19"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_576_5026">
          <rect width={dynamicSize} height={dynamicSize} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Minus;
