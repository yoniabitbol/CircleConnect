import React, { MouseEventHandler, useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import { Avatar, Button } from "@mui/material";
import useLogout from "../../hooks/useLogout";
import MobileNav from "./MobileNav";
import NavLinkModels from "../../lib/NavLinkModels";
import getCurrentUserProfile from "../../http/getCurrentUserProfile";
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



const NavBar: React.FC<{openSearch : boolean, searchClicked: MouseEventHandler<HTMLDivElement>}> = (props) => {
  const {openSearch, searchClicked} = props;
  const {logout} = useLogout();
  const [userProfilePic, setUserProfilePic] = useState<string>();
  const [usersInSearch, setUsersInSearch] = useState<UserInSearch[]>([]);
  const [searchBarExpanded, setSearchBarExpanded] = useState<boolean>();
  getCurrentUserProfile().then((res) => setUserProfilePic(res.data.user.picture));
  useEffect(() => {
    setSearchBarExpanded(openSearch);
  }, [openSearch]);
  
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
    <div className="w-screen p-2 flex items-center border sticky top-0 bg-white">
      <div className="min-[941px]:hidden left-0 relative w-min">
        <MobileNav links={NavLinkModels}/>
      </div>
      <div className="flex w-1/2 h-max max-[940px]:hidden bg-red-500">
        <Link className="ml-5 w-1/5" to='/'>
          <img
            style={{maxWidth: '5rem'}}
            src="Brand Logo/officccccc.png"
            alt="logo"
          />
        </Link>
        <NavLinks links={NavLinkModels}/>
      </div>
     
        <div className={`flex bg-blue-500 relative justify-center  ${searchBarExpanded ? 'w-[75%]' : 'w-2/5'}`} onClick={searchClicked}>
          <div className="p-2.5 w-[20rem]">
            <SearchBar searchResults={usersInSearch} inputChangeHandler={onChangeHandler}/>
          </div>
        </div>
        <div className={`flex items-center justify-end right-0 absolute max-[940px]:${searchBarExpanded && 'hidden'}`}>
          <div className="flex">
            <Link to="/profile"><Avatar src={userProfilePic}/></Link>
            <Button onClick={logout} sx={{color: '#4B47B7'}}>Logout</Button>
          </div>
        </div>
      </div>
     
    )};
export default NavBar;
