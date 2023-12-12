import { FC } from 'react';

import { sizes, Props } from '@components/icons/types';

const Joysticks: FC<Props> = ({ size }) => {
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
        d="M9.5 15V16.5C9.5 18.433 7.933 20 6 20C4.06701 20 2.5 18.433 2.5 16.5V9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 15V16.5C14.5 18.433 16.067 20 18 20C19.933 20 21.5 18.433 21.5 16.5V9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 4H8C4.96243 4 2.5 6.46243 2.5 9.5C2.5 12.5376 4.96243 15 8 15H16C19.0376 15 21.5 12.5376 21.5 9.5C21.5 6.46243 19.0376 4 16 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10.5 9.5H6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 7.5V11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M17 8.25C17.1381 8.25 17.25 8.36193 17.25 8.5C17.25 8.63807 17.1381 8.75 17 8.75C16.8619 8.75 16.75 8.63807 16.75 8.5C16.75 8.36193 16.8619 8.25 17 8.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M15 10.75C15.1381 10.75 15.25 10.8619 15.25 11C15.25 11.1381 15.1381 11.25 15 11.25C14.8619 11.25 14.75 11.1381 14.75 11C14.75 10.8619 14.8619 10.75 15 10.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default Joysticks;
