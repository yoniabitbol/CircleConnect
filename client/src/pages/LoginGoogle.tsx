// import { auth } from '../firebase/config';/
import useGoogle from '../hooks/useGoogle';

function LoginGoogle() {
  const { /* error, */ loginGoogle } = useGoogle();
  const googleSignIn = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    loginGoogle();
  };

  return (
    <div>
      <button type="button" onClick={googleSignIn}> Google Log in </button>
    </div>
  );
}

export default LoginGoogle;
