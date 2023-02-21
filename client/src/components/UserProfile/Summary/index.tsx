import React from "react";

const Summary: React.FC<{
  summary: string;
}> = ({ summary }) => {
  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">About</h1>
      {summary}
    </div>
  );
};

export default Summary;
