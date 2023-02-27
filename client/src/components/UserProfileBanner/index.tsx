import React from 'react';

const UserProfileBanner:React.FC<{name:any, title:any, location:any, profilePic:any, userBackdrop:any}> = (props) => {
    const {name, title, location, profilePic, userBackdrop} = props;
    return (
            <div className="pb-5 rounded-md bg-white w-full">
                <div>
                    <img
                        className="w-full max-h-20 rounded-t-md object-cover"
                        src={userBackdrop}
                        alt="backdrop"
                    />
                </div>
                <div className="flex justify-center -mt-16">
                    <img
                        className="w-32 h-32 rounded-full border-2 border-white"
                        src={profilePic}
                        alt="profile"
                    />
                </div>

                <div className="items-center flex-col flex">
                    <h1 className="text-2xl font-bold ">{name}</h1>
                    <h2 className="text-lg">{title}</h2>
                    <h3 className="text-lg">{location}</h3>
                </div>
        </div>
    )};

export default UserProfileBanner;