import useGoogle from '../hooks/useGoogle';
import saveUserToDB from '../utils/saveUserToDB';

function LoginGoogle() {
  const { loginGoogle } = useGoogle();

  const onClickHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    loginGoogle().then((res: any) => {
      saveUserToDB(res.accessToken, res.email, res.displayName, res.uid).then((resp) => {
        console.log(resp);
      }).catch((err) => {
        console.log('Error adding user to DB: ', err);
      });
    });
  };
  return (
    <button type="button" onClick={onClickHandler}> Google Auth </button>
  );
}

export default LoginGoogle;
