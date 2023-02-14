import React from "react";

const RightSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex flex-col gap-5 w-1/3">{children}</div>;
};

export default RightSection;
