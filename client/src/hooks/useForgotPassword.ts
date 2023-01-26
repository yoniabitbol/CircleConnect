import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';

export const useForgotPassword = () => {
    const [error, setError] = useState(null);
    const forgotPassword = (email: string) => {
        try {
          sendPasswordResetEmail(auth, email)
              .then(() => {
                  console.log('Password reset email sent!');
              });
        } catch (error: any) {
            setError(error);
            console.log(error);
        }
    };

    return { error, forgotPassword };
}

export default useForgotPassword;
