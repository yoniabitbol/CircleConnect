import React from "react";
import Message from "../Message";
import {Field, Form, Formik} from "formik";

const ChatDisplay: React.FC<{
  session: {
    user: {
      name: string;
      picture: string;
    };
  };
}> = ({ session }) => {
  return (
    <div className="mx-5 mt-5 h-9/12 rounded-md bg-slate-200">
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
      <hr className="border-gray-400 border" />
      <div className="ml-8 my-2">
        <Formik
          initialValues={{message: ""}}
          enableReinitialize
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form>
            <Field className="w-11/12 h-16 rounded-sm" type="message" name="message" placeholder="Write your message" />
            <button className="ml-5 bg-indigo-900" type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>);
};

export default ChatDisplay;
