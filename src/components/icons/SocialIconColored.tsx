import { FC } from 'react';

import { sizes, Props } from '@components/icons/types';

const SocialIconColored: FC<Props> = ({ size }) => {
  const dynamicSize = sizes[size];

  return (
    <svg
      width={dynamicSize}
      height={dynamicSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4010_15944)">
        <path
          d="M19.5844 10.2279C19.5844 9.49694 19.519 8.79754 19.3975 8.125H10.0006V11.9781L15.4125 11.9793C15.193 13.2613 14.4866 14.3542 13.4042 15.0828V17.5826H16.6256C18.5067 15.8417 19.5844 13.2683 19.5844 10.2279Z"
          fill="#4285F4"
        />
        <path
          d="M13.4054 15.0831C12.5086 15.688 11.3539 16.0418 10.0029 16.0418C7.39334 16.0418 5.17955 14.2833 4.38674 11.9131H1.06372V14.4912C2.71005 17.7581 6.09379 20 10.0029 20C12.7048 20 14.9746 19.1114 16.6268 17.5818L13.4054 15.0831Z"
          fill="#34A853"
        />
        <path
          d="M4.07379 10.0006C4.07379 9.33505 4.18471 8.6917 4.38671 8.08687V5.50879H1.06369C0.382975 6.85971 0 8.38461 0 10.0006C0 11.6166 0.384142 13.1415 1.06369 14.4924L4.38671 11.9143C4.18471 11.3095 4.07379 10.6661 4.07379 10.0006Z"
          fill="#FABB05"
        />
        <path
          d="M10.0029 3.9582C11.4776 3.9582 12.7982 4.46611 13.8409 5.45858L16.6957 2.60611C14.9618 0.991302 12.7013 0 10.0029 0C6.09495 0 2.71005 2.24181 1.06372 5.50879L4.38674 8.08687C5.17955 5.71662 7.39334 3.9582 10.0029 3.9582Z"
          fill="#E94235"
        />
      </g>
      <defs>
        <clipPath id="clip0_4010_15944">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SocialIconColored;
