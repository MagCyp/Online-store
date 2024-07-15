import { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

interface Props {
  setIsOpen: (isOpen: boolean) => void;
  setIsOpenError: (isOpen: boolean) => void;
}

const Verify: FC<Props> = ({ setIsOpen, setIsOpenError }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  axios
    .post(`${process.env.REACT_APP_API_URL}/auth/verify?token=${token}`)
    .then(() => {
      navigate('/');
      setIsOpen(true);
    })
    .catch(() => {
      navigate('/');
      setIsOpenError(true);
    });

  return <div></div>;
};

export default Verify;
