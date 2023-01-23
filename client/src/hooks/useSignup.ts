import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';
import useAuthContext from './useAuthContext';
import saveUserToDB from '../utils/saveUserToDB';

const useSignup = () => {
  const [error, setError] = useState(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    setError(null);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await dispatch({ type: 'LOGIN', payload: response.user });
      await updateProfile(response.user, { displayName: `${firstName} ${lastName}` });
      const token = await response.user.getIdToken();
      const dbRes = await
      saveUserToDB(token, response.user.email as string, response.user.displayName as string, response.user.uid);
      console.log(dbRes);
      return response.user;
    } catch (err: any) {
      setError(err);
      console.log(err.messaage);
      return error;
    }
  };

  return { error, signup };
};

export default useSignup;
