import { FC } from 'react';

import { sizes, Props } from '@components/icons/types';

const Headsets: FC<Props> = ({ size }) => {
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
        d="M21 15V12.2308C21 7.13275 16.9706 3 12 3C7.02945 3 3 7.13275 3 12.2308V15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M17 16C17 14.8954 17.8954 14 19 14H21V21H19C17.8954 21 17 20.1046 17 19V16Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M21.75 16.75H22C22.1381 16.75 22.25 16.8619 22.25 17V18C22.25 18.1381 22.1381 18.25 22 18.25H21.75V16.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M2 16.75H2.25V18.25H2C1.86192 18.25 1.75 18.1381 1.75 18V17C1.75 16.8619 1.86192 16.75 2 16.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 14H5C6.10455 14 7 14.8954 7 16V19C7 20.1046 6.10455 21 5 21H3V14Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Headsets;
