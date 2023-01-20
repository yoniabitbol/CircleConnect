import { useEffect, useState } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import useGoogle from '../hooks/useGoogle';

function Login() {
  const { /* error, */ loginGoogle } = useGoogle();
  const [localAuth, setLocalAuth] = useState(false || window.localStorage.getItem('auth') === 'true');
  const googleSignIn = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    loginGoogle()
      .then((data: { user: any; }) => {
        if (data) {
          setLocalAuth(true);
          window.localStorage.setItem('auth', 'true');
        }
      })
      .catch((err: any) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((token) => {
          window.localStorage.setItem('auth', 'true');
          console.log(token);
        });
      } else {
        setLocalAuth(false);
        window.localStorage.setItem('auth', 'true');
      }
    });
  }, []);

  return (
    <div>
      { localAuth ? <h1> Logged In </h1> : <button type="button" onClick={googleSignIn}> Google Log in </button>}
    </div>
  );
}

export default Login;
