import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import useAuthContext from './useAuthContext';
import { auth } from '../firebase/config';

const useGoogle = () => {
  const [error, setError] = useState(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { dispatch } = useAuthContext();
  const provider = new GoogleAuthProvider();
  const loginGoogle : any = async () => {
    setError(null);
    try {
      const response = await signInWithPopup(auth, provider)
        .then((res) => {
          dispatch({ type: 'LOGIN', payload: res.user });
          return res.user;
        }).catch((err) => {
          console.log(err);
        });
      // maybe remove
      return response;
    } catch (err: any) {
      setError(err);
      console.log(err.messaage);
      return error;
    }
  };
  return { error, loginGoogle };
};

export default useGoogle;
