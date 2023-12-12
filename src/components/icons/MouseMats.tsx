import { FC } from 'react';

import { sizes, Props } from '@components/icons/types';

const MouseMats: FC<Props> = ({ size }) => {
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
        d="M21 4H3C2.44771 4 2 4.44771 2 5V19C2 19.5523 2.44771 20 3 20H21C21.5523 20 22 19.5523 22 19V5C22 4.44771 21.5523 4 21 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default MouseMats;
