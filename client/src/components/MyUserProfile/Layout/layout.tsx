import React, { ReactNode } from "react";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="lg:flex lg:flex-row gap-5 px-5 lg:px-28 w-full my-5">
      {children}
    </div>
  );
};

export default Layout;
