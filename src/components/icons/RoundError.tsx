import { FC } from 'react';

import { sizes, Props } from '@components/icons/types';

const RoundError: FC<Props> = ({ size }) => {
  const dynamicSize = sizes[size];
  return (
    <svg
      width={dynamicSize}
      height={dynamicSize}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="6"
        y="6"
        width="40"
        height="40"
        rx="20"
        fill="#FF786E"
        fillOpacity="0.25"
      />
      <rect
        x="3"
        y="3"
        width="46"
        height="46"
        rx="23"
        stroke="#FF786E"
        strokeOpacity="0.1"
        strokeWidth="6"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26 16.75C20.8914 16.75 16.75 20.8914 16.75 26C16.75 31.1086 20.8914 35.25 26 35.25C31.1086 35.25 35.25 31.1086 35.25 26C35.25 20.8914 31.1086 16.75 26 16.75ZM15.25 26C15.25 20.0629 20.0629 15.25 26 15.25C31.9371 15.25 36.75 20.0629 36.75 26C36.75 31.9371 31.9371 36.75 26 36.75C20.0629 36.75 15.25 31.9371 15.25 26ZM26 21.25C26.4142 21.25 26.75 21.5858 26.75 22V26C26.75 26.4142 26.4142 26.75 26 26.75C25.5858 26.75 25.25 26.4142 25.25 26V22C25.25 21.5858 25.5858 21.25 26 21.25ZM25.25 30C25.25 29.5858 25.5858 29.25 26 29.25H26.01C26.4242 29.25 26.76 29.5858 26.76 30C26.76 30.4142 26.4242 30.75 26.01 30.75H26C25.5858 30.75 25.25 30.4142 25.25 30Z"
        fill="#F6F6F7"
      />
    </svg>
  );
};
export default RoundError;
