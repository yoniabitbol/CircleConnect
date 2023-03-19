import React, { MouseEventHandler, useState, useEffect } from "react";
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
import Usertypes from "../../Models/UserProfileModel";
import usersInSearchModel from "../../Models/UsersInSearchModel";
import getUserProfilePic from "../../http/getUserPicturePic";
import style from "./style.module.css";
import { useTranslation } from "react-i18next";

const NavBar: React.FC<{
  openSearch: boolean;
  searchClicked: MouseEventHandler<HTMLDivElement>;
  outsideClicked: MouseEventHandler<HTMLDivElement>;
}> = (props) => {
  const {t} = useTranslation();
  const { openSearch, searchClicked, outsideClicked } = props;
  const { logout } = useLogout();
  const [userProfilePic, setUserProfilePic] = useState<string>();
  const [usersInSearch, setUsersInSearch] = useState<UserInSearch[]>([]);
  // console.log(openSearch);

  useEffect(() => {
    async function fetchUserProfile() {
      const res = await getCurrentUserProfile();
      const profilePicUrl = await getUserProfilePic(res.data.user.picture);
      setUserProfilePic(profilePicUrl);
    }
    fetchUserProfile();
  }, []);


  const onChangeHandler = async () => {
    const res = await getAllUsers();
    const filteredArray: usersInSearchModel[] = [];
    res.data.users.map((user: Usertypes) => {
      filteredArray.push({
        id: user.user_id,
        position: user.title,
        name: user.name,
        type: "USERS",
        avatar: user.picture,
        label: user.name,
      });
    });
    setUsersInSearch(filteredArray);
  };
  return (
    <div className="p-2 flex items-center border sticky z-20 top-0 bg-white">
      <div className="lg:hidden left-0 relative w-min" onClick={outsideClicked}>
        <MobileNav links={NavLinkModels} />
      </div>
      <div className="flex w-1/2 h-max max-lg:hidden" onClick={outsideClicked}>
        <Link className="ml-5 w-1/5" to="/">
          <img
            style={{ maxWidth: "5rem" }}
            src={process.env.PUBLIC_URL + "/Brand Logo/officccccc.png"}
            alt="logo"
          />
        </Link>
        <NavLinks links={NavLinkModels} />
      </div>

      <div className={` flex relative justify-center  w-min`}>
        <div
          className={openSearch ? style.searchBarOpen : style.searchBar}
          onClick={searchClicked}
        >
          <SearchBar
            searchResults={usersInSearch}
            inputChangeHandler={onChangeHandler}
            loading={openSearch}
            searchOpen={openSearch}
            outsideClicked={outsideClicked}
          />
        </div>
      </div>
      <div
        className={`flex items-center justify-end right-0 absolute ${
          openSearch && "max-sm:hidden"
        }`}
        onClick={outsideClicked}
      >
        <div className="flex">
          <Link to="/myprofile">
            <Avatar src={userProfilePic} />
          </Link>
          <Button onClick={logout} sx={{ color: "#4B47B7" }}>
            {t('common.buttons.logout')}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
