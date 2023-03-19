import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AuthContent: React.FC = () => {
  const location = useLocation();
  const {t} = useTranslation();
  //i18n.changeLanguage("fr");
  return (
    
      <div className="relative lg:w-1/2">
        <div className="lg:flex lg:w-1/2 w-2/3 mx-auto h-full">
          <div className="lg:mt-48">
            <h1 className="text-4xl font-bold">CircleConnect</h1>
            <h2 className="text-2xl font-medium mt-3">
              {/* Connect, Collaborate, and Grow Your Circle */}
              {t('common.label.motto')}
            </h2>
            {location.pathname === "/signup" ? (
              <div className="font-medium mt-3">
                If you already have an account <br /> You can{" "}
                <Link to="/login" className="text-blue-500">
                {t('common.buttons.login')}
                </Link>
              </div>
            ) : (
              <div className="font-medium mt-3">
                If you don&apos;t already have an account <br /> You can{" "}
                <Link to="/signup" className="text-blue-500">
                  {t('common.buttons.signup')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    
  );
};

export default AuthContent;
