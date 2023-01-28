import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./Routes/SignUp";
import Login from "./Routes/Login";
import Profile from "./Routes/Profile";
import useAuthContext from "./hooks/useAuthContext";
import AuthHeader from "./components/AuthHeader";
import ForgotPass from "./Routes/ForgotPass";
import useLogout from "./hooks/useLogout";

function App() {
  const { user, authIsReady } = useAuthContext();
  const { logout } = useLogout();
  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <button onClick={logout}> Logout </button>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/*" element={<AuthHeader />}>
              <Route
                path="signup"
                element={!user ? <SignUp /> : <Navigate to="/" />}
              />
              <Route
                path="login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="profile"
                element={user ? <Profile /> : <Navigate to="/" />}
              />
              <Route
                path="forgot"
                element={!user ? <ForgotPass /> : <Navigate to="/" />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
