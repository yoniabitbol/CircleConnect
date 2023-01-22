import { Route, Routes } from 'react-router-dom';
import SignUp from './Routes/SignUp';
import Login from './Routes/Login';

function App() {
  return (
    <Routes>
      
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  );
}

export default App;
