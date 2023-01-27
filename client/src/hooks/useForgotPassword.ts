import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';

export const useForgotPassword = () => {
    const [error, setError] = useState(false);
    const forgotPassword = (email: string) => {
          sendPasswordResetEmail(auth, email)
              .then(() => {
                  console.log('Password reset email sent!');
              }).catch((error) => {
                setError(true)
                return error
                })
    };

    return { error, forgotPassword };
}

export default useForgotPassword;
