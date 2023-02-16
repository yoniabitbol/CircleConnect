import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./Routes/SignUp";
import Login from "./Routes/Login";
import MyProfile from "./Routes/MyProfile";
import Profile from "./Routes/Profile";
import useAuthContext from "./hooks/useAuthContext";
import AuthHeader from "./components/AuthHeader";
import ForgotPass from "./Routes/ForgotPass";
import ScreenContent from "./Routes/ScreenContent";
import Network from "./Routes/Network";

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to="/myprofile" /> : <Navigate to="/login" />
              }
            />
            <Route path="/*" element={<ScreenContent />}>
              <Route
                path="profile/:id"
                element={user ? <Profile /> : <Navigate to="/" />}
              />
              <Route
                path="myprofile"
                element={user ? <MyProfile /> : <Navigate to="/" />}
              />
              <Route
                path="network"
                element={user ? <Network /> : <Navigate to="/" />}
              />
            </Route>

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
