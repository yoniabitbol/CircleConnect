import React from "react";
import Filter from "badwords-filter";
const Message: React.FC<{
  outbound: boolean;
  text: string;
}> = ({ outbound, text }) => {
  const textBoxStyle = outbound ? "bg-slate-100" : "bg-indigo-700 text-sky-50";
  console.log(`Testt ${text}`);
  const filter = new Filter({ list: ["badword","test","bob"] });
  console.log(filter.clean(text))
  return (
    <div>
      {outbound ? <span className="" /> : <span />}

      <div className={"rounded-md inline-block px-3 py-1 " + textBoxStyle}>
        <span>{filter.clean(text)}</span>
      </div>
    </div>
  );
};

export default Message;
