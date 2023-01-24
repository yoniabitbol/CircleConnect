import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './Routes/SignUp';
import Login from './Routes/Login';
import useAuthContext from "./hooks/useAuthContext";

function App() {
    const { user, authIsReady } = useAuthContext();
  return (
      <>
          {authIsReady && (
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={user ? <p>User Profile Here</p> : <Navigate to='/login' />} />
                      <Route path="/signup" element={!user ? <SignUp /> : <Navigate to='/' />} />
                      <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
                  </Routes>
              </BrowserRouter>)
          }
      </>




  );
}

export default App;
