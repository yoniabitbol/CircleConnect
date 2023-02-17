import React from "react";
import { useState, useEffect } from "react";
import getUserBackdrop from "../../../http/getUserBackdrop";
import getUserProfilePic from "../../../http/getUserPicturePic";

const Banner: React.FC<{
  banner: {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    website: string;
    connections: number;
    picture: string;
    backdrop: string;
  };
}> = ({ banner }) => {
  const [backdropUrl, setBackdropUrl] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");

  const [connectionState, setConnectionState] = useState("");


  // Fetch user profile picture and backdrop
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        if (banner.backdrop === "" || banner.picture === "") return;
        const backdropUrl = await getUserBackdrop(banner.backdrop);
        const profilePicUrl = await getUserProfilePic(banner.picture);

        setBackdropUrl(backdropUrl);
        setProfilePicUrl(profilePicUrl);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserProfile();
  }, [banner.backdrop, banner.picture]);


  // Fetch connection state
  

  return (
    <div>
      <div className="w-full pb-5 rounded-md bg-slate-200 mx-auto">
        <div>
          <img
            className="w-full lg:h-64 h-32 object-cover rounded-t-md"
            src={backdropUrl}
            alt="backdrop"
          />
        </div>
        <div className="flex justify-center -mt-16">
          <img
            className="w-32 h-32 rounded-full border-2 border-white"
            src={profilePicUrl}
            alt="profile"
          />
        </div>

        <div className="flex flex-col justify-center ml-5">
          <h1 className="text-2xl font-bold ">{banner.name}</h1>
          <h2 className="text-lg font-semibold">{banner.title}</h2>
          <h3 className="text-lg font-semibold">{banner.location}</h3>
        </div>

        <div className="flex flex-col justify-center mt-5 ml-5">
          <h1 className="text-lg font-semibold ">
            {banner.connections} Connections
          </h1>
        </div>

        <div>
          {connectionState === "notConnected" ? (
            <button
              type="submit"
              className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full m-5"
            >
              Connect
            </button>
          ) : connectionState === "pending" ? (
            <button
              type="submit"
              className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full m-5"
            >
              Pending
            </button>
          ) : (
            <button
              type="submit"
              className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full m-5"
            >
              Connected
            </button>
          )}
        </div>

        {/* click contact info to display a modal */}
        {/* <div className="flex flex-col justify-center ml-5">
        <h1 className="text-lg font-semibold ">{banner.email}</h1>
        <h1 className="text-lg font-semibold ">{banner.phone}</h1>
        <h1 className="text-lg font-semibold ">{banner.website}</h1>
      </div> */}
      </div>
    </div>
  );
};

export default Banner;
