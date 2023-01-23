import useLogout from '../hooks/useLogout';

function Logout() {
  const { logout } = useLogout();

  const onClickHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    logout();
  };
  return (
    <button type="button" onClick={onClickHandler}> Logout </button>
  );
}

export default Logout;
