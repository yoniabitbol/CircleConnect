import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
const ScreenContent = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen" style={{ backgroundColor: "#F7F9FB" }}>
        <Outlet/>
      </div>
      
      <Footer/>
    </>
  );
};

export default ScreenContent;