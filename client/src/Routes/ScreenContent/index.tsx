import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const ScreenContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(false)
  },[useParams])
  const expand = () => {
        setIsOpen(true)
  }
    const collapse = () => {
      setIsOpen(false)
    }
  return (
    <>
      <Navbar openSearch={isOpen} searchClicked={expand} outsideClicked={collapse}/>
      <div className="flex flex-col min-h-screen justify-between" onClick={collapse}>
        <Outlet/>
        <Footer/>
      </div>
    </>
  );
};

export default ScreenContent;