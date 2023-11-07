import React from 'react';
import { Props } from './types';

const Error: React.FC<Props> = ({ message }) => {
  return (
    <div style={{ color: 'red', paddingLeft: '10px', display: 'block' }}>
      {message}
    </div>
  );
};

export default Error;
