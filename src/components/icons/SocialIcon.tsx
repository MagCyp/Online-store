import { FC } from 'react';

import { sizes, Props } from '@components/icons/types';

const SocialIcon: FC<Props> = ({ size }) => {
  const dynamicSize = sizes[size];

  return (
    <svg
      width={dynamicSize}
      height={dynamicSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_847_6143)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.8424 6.54784C15.6034 5.36614 13.9499 4.72238 12.239 4.74884C9.10842 4.74884 6.4496 6.86089 5.50158 9.70489V9.70496C4.99892 11.1953 4.99892 12.8091 5.50158 14.2995H5.50598C6.4584 17.1391 9.11282 19.2512 12.2434 19.2512C13.8595 19.2512 15.2468 18.8378 16.3221 18.1077V18.1047C17.5876 17.267 18.4518 15.9486 18.7208 14.4582H12.239V9.83725H23.5578C23.6989 10.6397 23.7651 11.4599 23.7651 12.2756C23.7651 15.9255 22.4607 19.0112 20.1911 21.1012L20.1935 21.1031C18.2049 22.9374 15.4755 24 12.239 24C7.70183 24 3.55265 21.4426 1.51553 17.3904V17.3904C-0.186456 13.9996 -0.186452 10.0048 1.51555 6.61401H1.51557L1.51553 6.61398C3.55265 2.5574 7.70183 -1.53086e-05 12.239 -1.53086e-05C15.2197 -0.03529 18.099 1.08468 20.2684 3.12179L16.8424 6.54784Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_847_6143">
          <rect width={dynamicSize} height={dynamicSize} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SocialIcon;
