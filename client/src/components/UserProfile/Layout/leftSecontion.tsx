import React from "react";

const LeftSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex flex-col gap-5 w-2/3 pr-10">{children}</div>;
};

export default LeftSection;
