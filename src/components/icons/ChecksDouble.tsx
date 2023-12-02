import { FC } from 'react';
import { sizes, Props } from '@components/icons/types';

const ChecksDouble: FC<Props> = ({ size }) => {
  const dynamicSize = sizes[size];

  return (
    <svg
      width={dynamicSize}
      height={dynamicSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_576_5013)">
        <path
          d="M7 12L12 17L22 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 12L17 7M2 12L7 17L2 12Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_576_5013">
          <rect width={dynamicSize} height={dynamicSize} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ChecksDouble;
