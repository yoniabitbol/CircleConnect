import React from "react";
import Message from "../Message";
import { Field, Form, Formik } from "formik";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import MessageModel from "../../../Models/MessageModel";
import UserProfileModel from "../../../Models/UserProfileModel";

export interface MessageType {
  id: number;
  outbound: boolean;
  text: string;
}

const ChatDisplay: React.FC<{
  messages: MessageModel[];
  uid: string;
  threadProfile: UserProfileModel | undefined;
}> = ({ threadProfile, messages, uid }) => {
  return (
    <div className="mx-5 mt-5 h-min rounded-md bg-white">
      <div className="justify-start ml-10 my-3">
        <span className="text-sm font-bold">
          CHAT WITH{" "}
          <span style={{ color: "#4B47B7" }}>
            {threadProfile ? threadProfile.name.toUpperCase() : ""}
          </span>
        </span>
      </div>
      <hr className="border-gray-100 border" />

      <div className="w-11/12 h-[20rem] ml-5 mt-5 pb-5 inline-block overflow-y-auto scrolling-touch">
        {messages.map((message) => (
          <div
            key={message._id}
            className={
              message.senderID == uid
                ? "ml-20 mt-2 justify-end flex"
                : "mx-5 mt-2 justify-start flex" + " flex"
            }
          >
            <Message outbound={message.senderID == uid} text={message.text} />
          </div>
        ))}
      </div>
      <hr className="border-gray-100 border" />
      <div className="ml-8 my-2">
        <Formik
          initialValues={{ outbound: true, message: "" }}
          enableReinitialize
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            resetForm();
          }}
        >
          <Form>
            <Field
              className="2xl:w-11/12 sm:w-4/5 w-3/5 h-16 bg-transparent"
              type="message"
              name="message"
              placeholder="Write your message"
            />
            <button
              className="mx-5 bg-indigo-700 h-10 w-10 rounded-lg"
              type="submit"
            >
              <PaperAirplaneIcon className="stroke-white" />
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ChatDisplay;
