import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import useAuthContext from './useAuthContext';
import { auth } from '../firebase/config';
import saveUserToDB from '../http/saveUserToDB';

const useGoogle = () => {
  const [error, setError] = useState(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { dispatch } = useAuthContext();
  const provider = new GoogleAuthProvider();
  const loginGoogle : any = async () => {
    setError(null);

    try {
      const response = await signInWithPopup(auth, provider);
      await dispatch({ type: 'LOGIN', payload: response.user });
      const token = await response.user.getIdToken();
      const dbRes = await saveUserToDB(token, response.user.email as string, response.user.displayName as string, response.user.uid);
      console.log(dbRes);
      return response.user;
    } catch (err: any) {
      setError(err);
      console.log(err.messaage);
      return error;
    }
  };
  return { error, loginGoogle };
};

export default useGoogle;
