import { FC, useState } from 'react';

import { Props } from '@pages/userAccount/favorite/types';

const Favorite: FC<Props> = ({ content = 'favorite' }) => {
  return <div>{content}</div>;
};

export default Favorite;
