import useGoogle from '../hooks/useGoogle';

function LoginGoogle() {
  const { loginGoogle } = useGoogle();

  const onClickHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    loginGoogle().then(() => {
      console.log('Success: ');
    }).catch((err: any) => {
      console.log('Error:', err);
    });
  };
  return (
    <button type="button" onClick={onClickHandler}> Google Auth </button>
  );
}

export default LoginGoogle;
