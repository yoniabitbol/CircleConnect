import React from "react";

const Description: React.FC<{
  summary: string;
}> = ({ summary }) => {
  return (
    <div className="lg:w-2/3 w-4/5 m-5 p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">About</h1>
      {summary}
    </div>
  );
};

export default Description;
