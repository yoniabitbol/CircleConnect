/* eslint-disable react/no-unknown-property */
/* eslint-disable max-len */
/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState(sessionStorage.getItem('language') || "en");

  useEffect(() => {
    const savedLanguage:string = window.sessionStorage.getItem('language')!;
    setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem('language', language);
    i18n.changeLanguage(language);
    }, [language]);

  return (
    <>
    <div className="flex items-center md:order-2">
        <button type="button" data-dropdown-toggle="language-dropdown-menu" className="inline-flex items-center justify-center px-4 py-2 text-sm text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 light:hover:bg-gray-700 light:hover:text-white" 
        onClick={() =>{
          setLanguage("en");
          window.location.reload();
        }
        } >
            <svg 
             onClick={() =>{ 
              setLanguage("en")
              window.location.reload();
            }
            }
            className="w-5 h-5 mr-2 rounded-full" aria-hidden="true" viewBox="0 0 3900 3900"><path fill="#b22234" d="M0 0h7410v3900H0z"/><path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff" strokeWidth="300"/><path fill="#3c3b6e" d="M0 0h2964v2100H0z"/></svg>
            English
        </button>
          <button 
            type="button" 
            data-dropdown-toggle="language-dropdown-menu" 
            className="inline-flex items-center justify-center px-4 py-2 text-sm text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 light:hover:bg-gray-700 light:hover:text-white"   
            onClick={() => {setLanguage("fr");window.location.reload();}}>
            <svg 
              onClick={() => {setLanguage("fr");window.location.reload();}}
              className="w-5 h-5 mr-2 rounded-full" 
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 512 512"> 
              <rect width="512" height="512" fill="#F31830"/>
              <rect x="192" y="0" width="128" height="512" fill="#FFFFFF"/>
              <rect x="320" y="0" width="192" height="512" fill="#002395"/>
              </svg>
            French 
          </button>
    </div> 
    </>
  );
};

export default LanguageDropdown;