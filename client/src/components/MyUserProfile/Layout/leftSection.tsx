import React from "react";

const LeftSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col gap-5 lg:w-2/3 lg:pr-10">{children}</div>
  );
};

export default LeftSection;
