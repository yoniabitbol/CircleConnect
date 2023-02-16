import React, {useState} from "react";
import NavLinks from "./NavLinks";
import { Link ,Outlet} from "react-router-dom";
import SearchBar from "../SearchBar";
import { Avatar, Button } from "@mui/material";
import useLogout from "../../hooks/useLogout";
import MobileNav from "./MobileNav";
import NavLinkModels from "../../lib/NavLinkModels";
import getCurrentUserProfile from "../../http/getCurrentUserProfile";
import Footer from "../Footer";
import UserInSearch from "../../Models/UsersInSearchModel";
import getAllUsers from "../../http/getAllUsers";
import { Usertypes } from "../UserProfile";
// import UsersInSearchModel from "../../Models/UsersInSearchModel";
// const Dummy_user_data : UserInSearch[]= [
//   {
//     id: 1,
//     name: "Leanne Graham",
//     type: "USERS",
//     position: "CEO",
//     avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
//     label: "Leanne Graham"
//
//
//   },
//   {
//     id: 2,
//     name: "Ervin Howell",
//     type: "USERS",
//     position: "Senior Developer",
//     avatar: 'https://material-ui.com/static/images/avatar/2.jpg',
//     label: "Ervin Howell"
//
//   },
//   {
//     id: 3,
//     name: "Clementine Bauch",
//     type: "USERS",
//     position: "Junior Developer",
//     avatar: 'https://material-ui.com/static/images/avatar/3.jpg',
//     label: "Clementine Bauch"
//   },
//   {
//     id: 4,
//     name: "Google",
//     type: "JOBS",
//     position: "Senior Developer",
//       avatar: 'https://img.icons8.com/color/48/000000/google-logo.png',
//     label: "Google"
//   }
//   ]


const NavBar: React.FC = () => {
  const {logout} = useLogout();
  const [userProfilePic, setUserProfilePic] = useState<string>();
  const [usersInSearch, setUsersInSearch] = useState<UserInSearch[]>([]);
  getCurrentUserProfile().then((res) => setUserProfilePic(res.data.user.picture));
  
  const onChangeHandler = async () => {
    const res = await getAllUsers();
   const filteredArray : any  = []
    res.data.users.map((user: Usertypes ) => {
        filteredArray.push({
            id: user.user_id,
            name: user.name,
            type: "USERS",
            avatar: user.picture,
            label: user.name
        })
    })
    
    setUsersInSearch(filteredArray)
  }
  return (
    <>
    <div className="w-screen p-2 flex items-center border sticky top-0 bg-white">
      <div className="min-[941px]:hidden">
        <MobileNav links={NavLinkModels}/>
      </div>
      <div className="flex w-1/2 h-max  max-[940px] w-4/5 max-[940px]:hidden">
        <Link className="ml-10 w-1/5" to='/'>
          <img
            style={{maxWidth: '5rem'}}
            src="Brand Logo/officccccc.png"
            alt="logo"
          />
        </Link>
        <NavLinks links={NavLinkModels}/>
      </div>
      <div className="flex items-center ml-15 w-1/2 max-[940px]:w-full pl-7">
        <div className="flex items-center p-2.5 w-4/5">
          <SearchBar searchResults={usersInSearch} inputChangeHandler={onChangeHandler}/>
        </div>
        <div className="flex">
          <Link to="/profile"><Avatar src={userProfilePic}/></Link>
          <Button onClick={logout} sx={{color: '#4B47B7'}}>Logout</Button>
        </div>
      </div>
    </div>
    <div className="flex flex-col min-h-screen justify-between ">
    <Outlet/>
    <Footer/>
  </div>  
      </>
    )};

export default NavBar;
