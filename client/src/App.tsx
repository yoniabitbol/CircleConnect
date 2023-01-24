import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './Routes/SignUp';
import Login from './Routes/Login';
import useAuthContext from "./hooks/useAuthContext";
import AuthHeader from "./components/AuthHeader";

function App() {
    const { user, authIsReady } = useAuthContext();
  return (
      <>
          {authIsReady && (
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={user ? <p>Logged in</p> : <Navigate to='/login' />} />
                    <Route path="/*" element={<AuthHeader />} >
                      <Route path="signup" element={!user ? <SignUp /> : <Navigate to='/' />} />
                      <Route path="login" element={!user ? <Login /> : <Navigate to='/' />} />
                    </Route>

                  </Routes>
              </BrowserRouter>)
          }
      </>




  );
}

export default App;
