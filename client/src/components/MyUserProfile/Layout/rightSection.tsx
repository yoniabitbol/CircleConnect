/* eslint-disable object-curly-newline */
import React from "react";

const RightSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-col gap-5 lg:w-1/3 w-full lg:mt-0 mt-5">
      {children}
    </div>
  );
};

export default RightSection;
