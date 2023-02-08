import React from "react";
import SessionItem from "../SessionItem";

const Sessions: React.FC = () => {
  return (
    <div>
      <div className="lg:w-1/5 w-4/5 m-5 pb-5 rounded-md bg-slate-200 inline-block justify-start">
        <div className="justify-start ml-10 my-6">
          <span className="text-sm">CHATS</span>
        </div>
        <hr className="border-gray-400 border" />
        <SessionItem
          selected={false}
          session={{
            user: {
              name: "Chad Thundercock",
              picture: "https://cdn.discordapp.com/attachments/800804024109891595/1067509878534438972/IMG_20220119_162228_138.jpg",
            },
            latestMsg: "Hey gamer",
          }}
        />
        <SessionItem
          selected={true}
          session={{
            user: {
              name: "Hungry Boi",
              picture: "https://cdn.discordapp.com/attachments/672975677460447232/1072778010597535784/photo_2022-05-21_09-09-15.jpg",
            },
            latestMsg: "Are you food",
          }}
        />
      </div>
    </div>);
};

export default Sessions;
