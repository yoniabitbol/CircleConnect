import { Route, Routes } from 'react-router-dom';
import SignUp from './Routes/SignUp';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
