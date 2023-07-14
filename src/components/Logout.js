// components/Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { signOut } from 'firebase/auth';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await signOut(auth);
        navigate('/');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

    logout();
  }, [navigate]);

  return null;
};

export default Logout;