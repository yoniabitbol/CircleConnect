import React from "react";
import Message from "../Message";
import {Field, Form, Formik} from "formik";
import {PaperAirplaneIcon} from "@heroicons/react/24/outline";

const ChatDisplay: React.FC<{
  session: {
    user: {
      name: string;
      picture: string;
    };
  };
}> = ({ session }) => {
  return (
    <div className="mx-5 mt-5 h-min rounded-md bg-slate-200">
      <div className="justify-start ml-10 my-3">
        <span className="text-sm">CHAT WITH {session.user.name}</span>
      </div>
      <hr className="border-gray-400 border" />

      <div className="w-11/12 h-2/5 ml-5 mt-5 pb-5 inline-block overflow-y-auto scrolling-touch">
        <div className="mx-5 mt-2 flex justify-start">
          <Message
            outbound={false}
            text={"Memes"}
          />
        </div>
        <div className="ml-20 mt-2 flex justify-end">
          <Message
            outbound={true}
            text={"Test"}
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
            <Field className="2xl:w-11/12 sm:w-4/5 w-3/5 h-16 bg-transparent" type="message" name="message" placeholder="Write your message" />
            <button className="mx-5 bg-indigo-900 h-10 w-10 rounded-lg" type="submit"><PaperAirplaneIcon className="stroke-white" /></button>
          </Form>
        </Formik>
      </div>
    </div>);
};

export default ChatDisplay;
