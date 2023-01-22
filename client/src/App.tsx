import { Route, Routes } from 'react-router-dom';
import SignUp from './Routes/SignUp';
import Login from './Routes/Login';
import AuthHeader from "./components/AuthHeader";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<AuthHeader />}>
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login/>} />
      </Route>
      
     
    </Routes>
  );
}

export default App;
