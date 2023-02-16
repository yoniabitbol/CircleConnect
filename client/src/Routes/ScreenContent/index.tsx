import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
const ScreenContent = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen justify-between">
        <Outlet/>
        <Footer/>
      </div>
    </>
  );
};

export default ScreenContent;