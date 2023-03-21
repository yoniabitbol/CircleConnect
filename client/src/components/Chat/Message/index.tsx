import React from "react";

const Message: React.FC<{
  outbound: boolean;
  text: string;
}> = ({ outbound, text }) => {
  const textBoxStyle = outbound ? "bg-slate-100" : "bg-indigo-700 text-sky-50";

  return (
    <div>
      {outbound ? (
        <span className="" />
      ) : (<span />)}

      <div className={"rounded-md inline-block px-3 py-1 " + textBoxStyle}>
        <span>{text}</span>
      </div>
    </div>);
};

export default Message;
