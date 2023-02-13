import React from "react";
import Message from "../Message";

const ChatDisplay: React.FC<{
  session: {
    user: {
      name: string;
      picture: string;
    };
  };
}> = ({ session }) => {
  return (
    <div className="mx-5 mt-5 h-4/5 rounded-md bg-slate-200">
      <div className="justify-start ml-10 my-3">
        <span className="text-sm">CHAT WITH {session.user.name}</span>
      </div>
      <hr className="border-gray-400 border" />

      <div className="h-4/5 ml-5 mt-5 pb-5 inline-block overflow-y-auto scrolling-touch">
        <div className="mx-5 mt-2 flex justify-start">
          <Message
            outbound={false}
            text={"Memes"}
          />
        </div>
        <div className="mx-5 mt-2 flex justify-end">
          <Message
            outbound={true}
            text={"⠀⠀⠀⠀⣀⣤\n" +
              "\n" +
              "⠀⠀⠀⠀⣿⠿⣶\n" +
              "\n" +
              "⠀⠀⠀⠀⣿⣿⣀\n" +
              "\n" +
              "⠀⠀⠀⣶⣶⣿⠿⠛⣶\n" +
              "\n" +
              "⠤⣀⠛⣿⣿⣿⣿⣿⣿⣭⣿⣤\n" +
              "\n" +
              "⠒⠀⠀⠀⠉⣿⣿⣿⣿⠀⠀⠉⣀\n" +
              "\n" +
              "⠀⠤⣤⣤⣀⣿⣿⣿⣿⣀⠀⠀⣿\n" +
              "\n" +
              "⠀⠀⠛⣿⣿⣿⣿⣿⣿⣿⣭⣶⠉\n" +
              "\n" +
              "⠀⠀⠀⠤⣿⣿⣿⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⣭⣿⣿⣿⠀⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⣉⣿⣿⠿⠀⠿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⣿⣿⠀⠀⠀⣿⣿⣤\n" +
              "\n" +
              "⠀⠀⠀⣀⣿⣿⠀⠀⠀⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⣿⣿⣿⠀⠀⠀⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⣿⣿⠛⠀⠀⠀⠉⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠉⣿⠀⠀⠀⠀⠀⠛⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⣛⠀⠀⠀⠀⠀⠀⠛⠿⠿⠿\n" +
              "\n" +
              "⠀⠀⠀⠛⠛\n" +
              "\n" +
              "⠀⠀⠀⣀⣶⣀\n" +
              "\n" +
              "⠀⠀⠀⠒⣛⣭\n" +
              "\n" +
              "⠀⠀⠀⣀⠿⣿⣶\n" +
              "\n" +
              "⠀⣤⣿⠤⣭⣿⣿\n" +
              "\n" +
              "⣤⣿⣿⣿⠛⣿⣿⠀⣀\n" +
              "\n" +
              "⠀⣀⠤⣿⣿⣶⣤⣒⣛\n" +
              "\n" +
              "⠉⠀⣀⣿⣿⣿⣿⣭⠉\n" +
              "\n" +
              "⠀⠀⣭⣿⣿⠿⠿⣿\n" +
              "\n" +
              "⠀⣶⣿⣿⠛⠀⣿⣿\n" +
              "\n" +
              "⣤⣿⣿⠉⠤⣿⣿⠿\n" +
              "\n" +
              "⣿⣿⠛⠀⠿⣿⣿\n" +
              "\n" +
              "⣿⣿⣤⠀⣿⣿⠿\n" +
              "\n" +
              "⠀⣿⣿⣶⠀⣿⣿⣶\n" +
              "\n" +
              "⠀⠀⠛⣿⠀⠿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⣉⣿⠀⣿⣿\n" +
              "\n" +
              "⠀⠶⣶⠿⠛⠀⠉⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⣀⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⣶⣿⠿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⣤⣿⣿⠶⠀⠀⣀⣀\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⣀⣀⣤⣤⣶⣿⣿⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⣀⣶⣤⣤⠿⠶⠿⠿⠿⣿⣿⣿⣉⣿⣿\n" +
              "\n" +
              "⠿⣉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⣤⣿⣿⣿⣀\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⣿⣿⣿⣿⣶⣤\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣿⣿⣿⣿⠿⣛⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⠛⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⣿⣿⠿⠀⣿⣿⣿⠛\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⠀⠀⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠿⠿⣿⠀⠀⣿⣶\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠛⠀⠀⣿⣿⣶\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⣿⣿⠤\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣀\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⣿\n" +
              "⠀⠀⣀\n" +
              "\n" +
              "⠀⠿⣿⣿⣀\n" +
              "\n" +
              "⠀⠉⣿⣿⣀\n" +
              "\n" +
              "⠀⠀⠛⣿⣭⣀⣀⣤\n" +
              "\n" +
              "⠀⠀⣿⣿⣿⣿⣿⠛⠿⣶⣀\n" +
              "\n" +
              "⠀⣿⣿⣿⣿⣿⣿⠀⠀⠀⣉⣶\n" +
              "\n" +
              "⠀⠀⠉⣿⣿⣿⣿⣀⠀⠀⣿⠉\n" +
              "\n" +
              "⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⣀⣿⣿⣿⣿⣿⣿⣿⣿⠿\n" +
              "\n" +
              "⠀⣿⣿⣿⠿⠉⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⣿⣿⠿⠀⠀⣿⣿⣿⣿\n" +
              "\n" +
              "⣶⣿⣿⠀⠀⠀⠀⣿⣿⣿\n" +
              "\n" +
              "⠛⣿⣿⣀⠀⠀⠀⣿⣿⣿⣿⣶⣀\n" +
              "\n" +
              "⠀⣿⣿⠉⠀⠀⠀⠉⠉⠉⠛⠛⠿⣿⣶\n" +
              "\n" +
              "⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣿\n" +
              "\n" +
              "⠀⠀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉\n" +
              "\n" +
              "⣀⣶⣿⠛\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⣿⣿⣿⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣤⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠉⣿⣿⣿⣶⣿⣿⣿⣶⣶⣤⣶⣶⠶⠛⠉⠉\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⣤⣿⠿⣿⣿⣿⣿⣿⠀⠀⠉⠀⠀⠀⠀⠀⠀\n" +
              "\n" +
              "⠛⣿⣤⣤⣀⣤⠿⠉⠀⠉⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀\n" +
              "\n" +
              "⠀⠉⠉⠉⠉⠉⠀⠀⠀⠀⠉⣿⣿⣿⣀⠀⠀⠀⠀⠀⠀⠀⠀\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⠛⠀⠀⠀⠀⠀⠀⠀\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣛⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⣶⣿⣿⠛⠿⣿⣿⣿⣶⣤⠀⠀⠀⠀⠀⠀\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⣿⠛⠉⠀⠀⠀⠛⠿⣿⣿⣶⣀⠀⠀⠀⠀\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⣿⣀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠿⣶⣤⠀⠀\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠛⠿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣿⣿⠿⠀\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠉⠉⠀\n" +
              "⠀⠀⠀⠀⠀⠀⣤⣶⣶\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣀⣀\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⣀⣶⣿⣿⣿⣿⣿⣿\n" +
              "\n" +
              "⣤⣶⣀⠿⠶⣿⣿⣿⠿⣿⣿⣿⣿\n" +
              "\n" +
              "⠉⠿⣿⣿⠿⠛⠉⠀⣿⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠉⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣤⣤\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⣤⣶⣿⣿⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⣀⣿⣿⣿⣿⣿⠿⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⣀⣿⣿⣿⠿⠉⠀⠀⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⣿⣿⠿⠉⠀⠀⠀⠀⠿⣿⣿⠛\n" +
              "\n" +
              "⠀⠀⠀⠀⠛⣿⣿⣀⠀⠀⠀⠀⠀⣿⣿⣀\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⣿⣿⣿⠀⠀⠀⠀⠀⠿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠉⣿⣿⠀⠀⠀⠀⠀⠀⠉⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⣀⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⣀⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠤⣿⠿⠿⠿\n" +
              "\n" +
              "⠀⠀⠀⠀⣀\n" +
              "\n" +
              "⠀⠀⣶⣿⠿⠀⠀⠀⣀⠀⣤⣤\n" +
              "\n" +
              "⠀⣶⣿⠀⠀⠀⠀⣿⣿⣿⠛⠛⠿⣤⣀\n" +
              "\n" +
              "⣶⣿⣤⣤⣤⣤⣤⣿⣿⣿⣀⣤⣶⣭⣿⣶⣀\n" +
              "\n" +
              "⠉⠉⠉⠛⠛⠿⣿⣿⣿⣿⣿⣿⣿⠛⠛⠿⠿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⠿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠿⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⣭⣿⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⣤⣿⣿⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⠿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⠿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠉⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠉⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⣿⠛⠿⣿⣤\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣿⠀⠀⠀⣿⣿⣤\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⣶⣿⠛⠉\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⣤⣿⣿⠀⠀⠉\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣶\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⣀⣀⠀⣶⣿⣿⠶\n" +
              "\n" +
              "⣶⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣤⣤\n" +
              "\n" +
              "⠀⠉⠶⣶⣀⣿⣿⣿⣿⣿⣿⣿⠿⣿⣤⣀\n" +
              "\n" +
              "⠀⠀⠀⣿⣿⠿⠉⣿⣿⣿⣿⣭⠀⠶⠿⠿\n" +
              "\n" +
              "⠀⠀⠛⠛⠿⠀⠀⣿⣿⣿⣉⠿⣿⠶\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⣤⣶⣿⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⠒\n" +
              "\n" +
              "⠀⠀⠀⠀⣀⣿⣿⣿⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⣿⣿⣿⠛⣭⣭⠉\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⣿⣿⣭⣤⣿⠛\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠛⠿⣿⣿⣿⣭\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⣿⣿⠉⠛⠿⣶⣤\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⣀⣿⠀⠀⣶⣶⠿⠿⠿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⣿⠛\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⣭⣶\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣤\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⣶⠀⠀⣀⣤⣶⣤⣉⣿⣿⣤⣀\n" +
              "\n" +
              "⠤⣤⣿⣤⣿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣀\n" +
              "\n" +
              "⠀⠛⠿⠀⠀⠀⠀⠉⣿⣿⣿⣿⣿⠉⠛⠿⣿⣤\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠿⣿⣿⣿⠛⠀⠀⠀⣶⠿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⣀⣿⣿⣿⣿⣤⠀⣿⠿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⣶⣿⣿⣿⣿⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠿⣿⣿⣿⣿⣿⠿⠉⠉\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠉⣿⣿⣿⣿⠿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⠉\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⣛⣿⣭⣶⣀\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠉⠛⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣉⠀⣶⠿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠀⣶⣿⠿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⠀⠀⠛⠿⠛⠀⠀⠀\n" +
              "⠀⠀⠀⣶⣿⣶\n" +
              "\n" +
              "⠀⠀⠀⣿⣿⣿⣀\n" +
              "\n" +
              "⠀⣀⣿⣿⣿⣿⣿⣿\n" +
              "\n" +
              "⣶⣿⠛⣭⣿⣿⣿⣿\n" +
              "\n" +
              "⠛⠛⠛⣿⣿⣿⣿⠿\n" +
              "\n" +
              "⠀⠀⠀⠀⣿⣿⣿\n" +
              "\n" +
              "⠀⠀⣀⣭⣿⣿⣿⣿⣀\n" +
              "\n" +
              "⠀⠤⣿⣿⣿⣿⣿⣿⠉\n" +
              "\n" +
              "⠀⣿⣿⣿⣿⣿⣿⠉\n" +
              "\n" +
              "⣿⣿⣿⣿⣿⣿\n" +
              "\n" +
              "⣿⣿⣶⣿⣿\n" +
              "\n" +
              "⠉⠛⣿⣿⣶⣤\n" +
              "\n" +
              "⠀⠀⠉⠿⣿⣿⣤\n" +
              "\n" +
              "⠀⠀⣀⣤⣿⣿⣿\n" +
              "\n" +
              "⠀⠒⠿⠛⠉⠿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⠀⣀⣿⣿\n" +
              "\n" +
              "⠀⠀⠀⠀⣶⠿⠿⠛\n" +
              "\n" +
              "⠀⠀"}
          />
        </div>
      </div>
    </div>);
};

export default ChatDisplay;
