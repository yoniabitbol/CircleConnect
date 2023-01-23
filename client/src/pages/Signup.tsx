import { useState, FormEvent } from 'react';
import useSignup from '../hooks/useSignup';
import saveUserToDB from '../utils/saveUserToDB';
// import { auth } from '../firebase/config';

function Signup() {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { signup } = useSignup();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signup(email, password, firstName, lastName).then((res: any) => {
      saveUserToDB(res.accessToken, email, `${firstName} ${lastName}`, res.uid).then((resp) => {
        console.log('User successfully added: ', resp);
      });
    });
  };

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          id="username"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Signup;
