import { FC } from 'react';

import { sizes, Props } from '@components/icons/types';

const Keyboard: FC<Props> = ({ size }) => {
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
        d="M21 9H3C2.44772 9 2 9.44772 2 10V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V10C22 9.44772 21.5523 9 21 9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7.25 12C7.25 12.1381 7.13807 12.25 7 12.25C6.86193 12.25 6.75 12.1381 6.75 12C6.75 11.8619 6.86193 11.75 7 11.75C7.13807 11.75 7.25 11.8619 7.25 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8.25 15C8.25 15.1381 8.13807 15.25 8 15.25C7.86193 15.25 7.75 15.1381 7.75 15C7.75 14.8619 7.86193 14.75 8 14.75C8.13807 14.75 8.25 14.8619 8.25 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5.25 15C5.25 15.1381 5.13807 15.25 5 15.25C4.86193 15.25 4.75 15.1381 4.75 15C4.75 14.8619 4.86193 14.75 5 14.75C5.13807 14.75 5.25 14.8619 5.25 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10.25 12C10.25 12.1381 10.1381 12.25 10 12.25C9.86193 12.25 9.75 12.1381 9.75 12C9.75 11.8619 9.86193 11.75 10 11.75C10.1381 11.75 10.25 11.8619 10.25 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M11.25 15C11.25 15.1381 11.1381 15.25 11 15.25C10.8619 15.25 10.75 15.1381 10.75 15C10.75 14.8619 10.8619 14.75 11 14.75C11.1381 14.75 11.25 14.8619 11.25 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M13.25 12C13.25 12.1381 13.1381 12.25 13 12.25C12.8619 12.25 12.75 12.1381 12.75 12C12.75 11.8619 12.8619 11.75 13 11.75C13.1381 11.75 13.25 11.8619 13.25 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M14.25 15C14.25 15.1381 14.1381 15.25 14 15.25C13.8619 15.25 13.75 15.1381 13.75 15C13.75 14.8619 13.8619 14.75 14 14.75C14.1381 14.75 14.25 14.8619 14.25 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M16.25 12C16.25 12.1381 16.1381 12.25 16 12.25C15.8619 12.25 15.75 12.1381 15.75 12C15.75 11.8619 15.8619 11.75 16 11.75C16.1381 11.75 16.25 11.8619 16.25 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M17.25 15C17.25 15.1381 17.1381 15.25 17 15.25C16.8619 15.25 16.75 15.1381 16.75 15C16.75 14.8619 16.8619 14.75 17 14.75C17.1381 14.75 17.25 14.8619 17.25 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M19.25 12C19.25 12.1381 19.1381 12.25 19 12.25C18.8619 12.25 18.75 12.1381 18.75 12C18.75 11.8619 18.8619 11.75 19 11.75C19.1381 11.75 19.25 11.8619 19.25 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8.5 18H15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 9V6.5625C16.5 6.28635 16.7239 6.0625 17 6.0625H19.5C19.7761 6.0625 20 5.83865 20 5.5625V3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Keyboard;
