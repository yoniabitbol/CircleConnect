import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';
// import firebase from 'firebase/compat';

const useGoogle = () => {
  const [error, setError] = useState(null);
  const provider = new GoogleAuthProvider();
  const loginGoogle : any = async () => {
    setError(null);
    try {
      const res = await signInWithPopup(auth, provider).catch((err) => {
        console.log(err.message);
      });
      return res;
    } catch (err: any) {
      setError(err);
      console.log(err.messaage);
      return error;
    }
  };
  return { error, loginGoogle };
};

export default useGoogle;
