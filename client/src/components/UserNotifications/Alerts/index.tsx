import React from "react";

const Alerts: React.FC<{
  type: string;
  description: string;
  time: string;
}> = (props) => {
  const { description, time } = props;
  return (
    <div className="lg:w-2/3 w-4/5 m-5 p-5 rounded-md bg-slate-100 mx-auto">
      <div className="flex flex-col justify-center mb-2">
            <h1 className="text-lg font-semibold pt-2">{description}</h1>
            <h2 className="text-sm">{time}</h2>
          </div>
    </div>
  );
};

export default Alerts;
