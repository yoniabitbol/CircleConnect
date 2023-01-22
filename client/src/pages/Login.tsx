// import { useState } from 'react';
import useLogout from '../hooks/useLogout';

function Login() {
  // const [email, setEmail] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [password, setPassword] = useState('');
  const { logout } = useLogout();

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    logout();
  };
  return (
    <div>
      <form>
        {/* <input type="firstName" placeholder="firstName" onChange={(e) => { setFirstName(e.target.value); }} /> */}
        {/* <input type="lastName" placeholder="lastName" onChange={(e) => { setLastName(e.target.value); }} /> */}
        {/* <input type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value); }} /> */}
        {/* <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value); }} /> */}
        <button type="submit" onClick={handleSubmit}>Login </button>
        {/* {error && <p>{error}</p>} */}
      </form>
    </div>
  );
}

export default Login;
