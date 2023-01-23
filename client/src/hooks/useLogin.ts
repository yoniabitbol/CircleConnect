import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import useAuthContext from './useAuthContext';
import { auth } from '../firebase/config';

const useLogin = () => {
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const login = (email: string, password: string) => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch('LOGIN', res.user);
      }).catch((err) => {
        alert(err.message);
      });
  };

  return { error, login };
};

export default useLogin;
