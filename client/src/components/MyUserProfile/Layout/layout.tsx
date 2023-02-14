import React, { ReactNode } from "react";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="flex flex-row gap-5 px-32 w-full">{children}</div>;
};

export default Layout;
