import { FC, useEffect } from 'react';
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

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/verify?token=${token}`,
        );
        setIsOpen(true);
        navigate('/');
      } catch (err) {
        setIsOpenError(true);
        navigate('/');
      }
    };

    verifyToken();
  }, [token, navigate, setIsOpen, setIsOpenError]);

  return <div></div>;
};

export default Verify;
