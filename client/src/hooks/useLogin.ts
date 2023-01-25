import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import useAuthContext from './useAuthContext';
import { auth } from '../firebase/config';

const useLogin = () => {
  const [error, setError] = useState(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { dispatch } = useAuthContext();

  const login = (email: string, password: string) => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: 'LOGIN', payload: res.user });
      }).catch((err) => {
        console.log(err.message);
      });
  };

  return { error, login };
};

export default useLogin;
