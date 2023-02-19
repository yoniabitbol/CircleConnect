import React, { MouseEventHandler,  useState } from "react";
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
import usersInSearchModel from "../../Models/UsersInSearchModel";

const NavBar: React.FC<{openSearch : boolean, searchClicked: MouseEventHandler<HTMLDivElement>, outsideClicked: MouseEventHandler<HTMLDivElement>}> = (props) => {
  const {openSearch, searchClicked, outsideClicked} = props;
  const {logout} = useLogout();
  const [userProfilePic, setUserProfilePic] = useState<string>();
  const [usersInSearch, setUsersInSearch] = useState<UserInSearch[]>([]);
  getCurrentUserProfile().then((res) => setUserProfilePic(res.data.user.picture));
  
  
  const onChangeHandler = async () => {
    const res = await getAllUsers();
   const filteredArray : usersInSearchModel[]  = []
    res.data.users.map((user: Usertypes ) => {
        filteredArray.push({
          id: user.user_id,
          position: user.title,
          name: user.name,
          type: "USERS",
          avatar: user.picture,
          label: user.name
        })
    })
    setUsersInSearch(filteredArray)
  }
  return (
    <div className="p-2 flex items-center border sticky top-0 bg-white">
      <div className="lg:hidden left-0 relative w-min" onClick={outsideClicked} >
        <MobileNav links={NavLinkModels}/>
      </div>
      <div className="flex w-1/2 h-max max-lg:hidden" onClick={outsideClicked}>
        <Link className="ml-5 w-1/5" to='/'>
          <img
            style={{maxWidth: '5rem'}}
            src="Brand Logo/officccccc.png"
            alt="logo"
          />
        </Link>
        <NavLinks links={NavLinkModels}/>
      </div>
     
        <div className={` flex relative justify-center  w-min`}>
          <div className={`p-2.5 ${openSearch ? 'w-[17rem]' : 'max-lg:min-w-max'} lg:w-[20rem]`} onClick={searchClicked}>
            <SearchBar searchResults={usersInSearch} inputChangeHandler={onChangeHandler} loading={openSearch} searchOpen={openSearch} outsideClicked={outsideClicked}/>
          </div>
        </div>
        <div className={`flex items-center justify-end right-0 absolute ${openSearch && 'max-sm:hidden'}`} onClick={outsideClicked}>
          <div className="flex">
            <Link to="/profile"><Avatar src={userProfilePic}/></Link>
            <Button onClick={logout} sx={{color: '#4B47B7'}}>Logout</Button>
          </div>
        </div>
      </div>
     
    )};
export default NavBar;
