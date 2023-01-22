import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';
import useAuthContext from './useAuthContext';

const useSignup = () => {
  const [error, setError] = useState(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { dispatch } = useAuthContext();

  const signup = (email: string, password: string, firstName: string, lastName: string) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({
          type: 'LOGIN',
          payload: res.user,
        });
        updateProfile(res.user, { displayName: `${firstName} ${lastName}` }).then(() => {
          console.log('Profile Updated.');
        });
      }).catch((err) => {
        alert(err.message);
      });
  };

  return { error, signup };
};

export default useSignup;
