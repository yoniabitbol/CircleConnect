import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import useAuthContext from './useAuthContext';

const useLogout = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { dispatch } = useAuthContext();

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: 'LOGOUT' });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return { logout };
};

export default useLogout;
