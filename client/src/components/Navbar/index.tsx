import React, {useState} from "react";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import { Avatar, Button } from "@mui/material";
import useLogout from "../../hooks/useLogout";
import MobileNav from "./MobileNav";
import NavLinkModels from "../../lib/NavLinkModels";
import getCurrentUserProfile from "../../http/getCurrentUserProfile";
const NavBar: React.FC = () => {
  const {logout} = useLogout();
  const [userProfilePic, setUserProfilePic] = useState<string>();
  getCurrentUserProfile().then((res) => setUserProfilePic(res.data.user.picture));
  return (
    <div className="max-w-full p-2 flex items-center border sticky top-0 bg-white">
      <div className="md:hidden">
        <MobileNav links={NavLinkModels}/>
      </div>

      <div className="flex w-3/4 h-max  max-md:w-4/5 max-md:hidden">
        <Link className="ml-10 w-1/5" to='/'>
          <img
            className="w-20"
            src="Brand Logo/officccccc.png"
            alt="logo"
          />
        </Link>
        <NavLinks links={NavLinkModels}/>
      </div>
      <div className="flex justify-center items-center ml-15 w-1/2 max-md:w-full">
        <div className="flex items-center p-2.5">
          <div>
            <SearchBar/>
          </div>
        </div>
        <div className="flex">
          <Link to="/profile"><Avatar src={userProfilePic}/></Link>
          <Button onClick={logout} sx={{color: '#4B47B7'}}>Logout</Button>
        </div>
      </div>
    </div>
    )};
{/*   <div className="flex flex-col min-h-screen justify-between "> */}
{/*   <Outlet/> */}
{/*   <Footer/> */}
{/* </div>   */}
export default NavBar;
