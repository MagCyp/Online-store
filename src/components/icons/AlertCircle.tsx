import { FC } from 'react';

import { sizes, Props } from '@components/icons/types';

const AlertCircle: FC<Props> = ({ size }) => {
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
        d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25ZM11.25 16C11.25 15.5858 11.5858 15.25 12 15.25H12.01C12.4242 15.25 12.76 15.5858 12.76 16C12.76 16.4142 12.4242 16.75 12.01 16.75H12C11.5858 16.75 11.25 16.4142 11.25 16Z"
        fill="#F6F6F7"
      />
    </svg>
  );
};
export default AlertCircle;
