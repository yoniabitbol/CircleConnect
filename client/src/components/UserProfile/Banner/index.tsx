import React from "react";

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
  return (
    <div className="w-2/3 m-5 rounded-md bg-slate-200">
      <div>
        <img
          className="w-full h-64 object-cover"
          src={banner.backdrop}
          alt="backdrop"
        />
      </div>
      <div className="flex justify-center -mt-16">
        <img
          className="w-32 h-32 rounded-full border-2 border-white"
          src={banner.picture}
          alt="profile"
        />
      </div>

      <div className="flex flex-col justify-center ml-5">
        <h1 className="text-2xl font-bold ">{banner.name}</h1>
        <h2 className="text-lg font-semibold">{banner.title}</h2>
        <h3 className="text-lg font-semibold">{banner.location}</h3>
      </div>

      <div className="flex mt-5">
        <div className="flex flex-col justify-center mr-5">
          <h1 className="text-lg font-semibold ">{banner.connections}</h1>
          <h2 className="text-lg font-semibold ">Connections</h2>
        </div>
      </div>
    </div>
  );
};

export default Banner;
