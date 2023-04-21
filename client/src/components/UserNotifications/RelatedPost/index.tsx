import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import getUserProfile from "../../../http/getUserProfile";
import { Usertypes } from "../../UserProfile";
import getUserProfilePic from "../../../http/getUserPicturePic";

const RelatedPost: React.FC<{
  initiatorID: string;
  notificationID: string;
  handleBtnClick: any;
}> = (props) => {
  const { initiatorID, notificationID, handleBtnClick } = props;

  const [user, setUser] = useState<Usertypes>();
  const [picture, setPicture] = useState<any>();

  useEffect(() => {
    async function fetchUser(user_id: string) {
      try {
        if (user_id === null) return;
        const user = await getUserProfile(user_id);
        setUser(user.data.user); // get post from the response object
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser(initiatorID);
  }, []);

  useEffect(() => {
    async function fetchUserProfilePic() {
      try {
        if (user?.picture == null) return;
        const profilePicUrl = await getUserProfilePic(user?.picture);
        setPicture(profilePicUrl);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserProfilePic();
  }, []);

  return (
    <div onClick={() => {
      handleBtnClick(notificationID)
    }}>
      {user != null ? (
        <a href={"/jobs"}>
          <div className="w-full m-4 py-3 rounded-md bg-white h-auto dark:secondary-dark">
            <div className="flex flex-row justify-between px-3">
              <div className="flex flex-row space-x-8 ">
                <div className="pt-2">
                  <Avatar sx={{ width: 50, height: 50 }} src={picture} />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-md font-bold">{user?.name}</h1>
                  <h2 className="text-xs font-semibold">{user?.title}</h2>
                  <h3 className="text-xs text-[#4B47B7] dark:main-color">
                    {user?.connections.length} connections
                  </h3>
                </div>
              </div>
              <div className="md:flex flex-row w-1/3">
                <h1 className="text-4xl pr-2" style={{ color: "#4B47B7" }}>
                  |
                </h1>
                <h3 className="text-sm text-gray-400">
                  {user?.name + " posted a job that matches your profile!"}
                </h3>
              </div>
            </div>
          </div>
        </a>
      ) : null}
    </div>
  );
};

export default RelatedPost;
