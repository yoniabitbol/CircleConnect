import React from "react";

const SessionItem: React.FC<{
  session: {
    user: {
      name: string;
      picture: string;
    };
    latestMsg: string;
  };

  selected: boolean;
}> = ({ session, selected }) => {
  return (
    <div>
      <div className="rounded-md bg-white dark:primary-dark">
        {selected ? (
          <span className="absolute left-5 w-4 h-14 justify-start bg-[#4B47B7]" />
        ) : (<span />)}

        <div className="ml-7 my-6 flex">
          <img
            className="w-14 h-14 rounded-full border-2 border-white"
            src={session.user.picture}
            alt="profile"
          />
          <div className="ml-2 mt-2 truncate">
            <p className="text-base font-semibold">{session.user.name}</p>
            <p className="text-xs flex justify-start">{session.latestMsg}</p>
          </div>
        </div>
      </div>
      <hr className="border-gray-100 border" />
    </div>);
};

export default SessionItem;
