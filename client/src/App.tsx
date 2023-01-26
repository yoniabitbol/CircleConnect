import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./Routes/SignUp";
import Login from "./Routes/Login";
import Profile from "./Routes/Profile";
import useAuthContext from "./hooks/useAuthContext";
import AuthHeader from "./components/AuthHeader";

function App() {
    const { user, authIsReady } = useAuthContext();
  return (
      <>
      {authIsReady && (
          <Routes>
            <Route path="/" element={user ? <p>Logged in</p> : <Navigate to="signup" />} />
            <Route path="/*" element={<AuthHeader />}>
            <Route path="signup" element={!user ? <SignUp /> : <Navigate to='/' />} />
            <Route path="login" element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>)
      }
      </>
  );
}

export default App;
