import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
const ScreenContent = () => {
  return (
    <>
      <Navbar />
      <Outlet/>
        <Footer/>
    </>
  );
};

export default ScreenContent;