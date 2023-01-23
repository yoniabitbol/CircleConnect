import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';
import useAuthContext from './useAuthContext';

const useSignup = () => {
  const [error, setError] = useState(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    setError(null);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          dispatch({
            type: 'LOGIN',
            payload: res.user,
          });
          updateProfile(res.user, { displayName: `${firstName} ${lastName}` }).then(() => {
            console.log('Firebase displayName Updated.');
          });
          return res.user;
        }).catch((err) => {
          alert(err.message);
        });
      // maybe remove
      return response;
    } catch (err: any) {
      setError(err);
      console.log(err.messaage);
      return error;
    }
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((res) => {
    //     dispatch({
    //       type: 'LOGIN',
    //       payload: res.user,
    //     });
    //     updateProfile(res.user, { displayName: `${firstName} ${lastName}` }).then(() => {
    //       console.log('Firebase displayName Updated.');
    //     });
    //     return res.user;
    //   }).catch((err) => {
    //     alert(err.message);
    //   });
  };

  return { error, signup };
};

export default useSignup;
