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

  const signup = async (email: string,
                        password: string,
                        firstName: string | undefined,
                        lastName: string | undefined) => {
    setError(null);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await dispatch({ type: 'LOGIN', payload: response.user });
      await updateProfile(response.user, { displayName: `${firstName} ${lastName}` });
      const token = await response.user.getIdToken();
      const dbRes = await
      saveUserToDB(token, response.user.email as string, response.user.displayName as string, response.user.uid)
          .catch((err) => {throw new Error(err)});
      // eslint-disable-next-line no-console
      console.log(dbRes);
      return response.user;
    } catch (err: any) {
      throw new Error(err);
      return error;
    }
  };

  return { error, signup };
};

export default useSignup;
