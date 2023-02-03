import React from "react";
import AuthContent from "../../components/AuthContent";

const Network: React.FC = () => {
  return (
    <div className="lg:flex justify-center lg:text-left text-center">
      <AuthContent />
      <div className="hidden lg:block lg:absolute lg:left-1/3 lg:bottom-40">
        <img className="h-96" src="Mascot/img.png" alt="logo" />
      </div>
    </div>
  );
};

export default Network;
