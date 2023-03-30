import React from "react";
import SessionItem from "../SessionItem";
import { Form, Formik } from "formik";
import ThreadModel from "../../../Models/ThreadModel";
import UserProfileModel from "../../../Models/UserProfileModel";

export type Thread = {
  id: number;
  name: string;
  picture: string;
  latestMsg: string;
};

const Sessions: React.FC<{
  threads: ThreadModel[];
  selectThread: (event: any) => void;
  selected: number;
  threadProfiles: UserProfileModel[];
}> = ({ threads, selectThread, selected, threadProfiles }) => {
  return (
    <div>
      <div className="ml-15 mt-5 pb-5 rounded-md bg-white overflow-auto">
        <div className="justify-start ml-10 my-6">
          <span className="text-sm font-bold">CHATS</span>
        </div>
        <hr className="border-gray-100 border" />
        {threads.map((thread, index) => {
          return (
            <button
              className="w-full h-full"
              key={thread._id}
              data-key={thread._id}
              type="submit"
              onClick={(event) => selectThread(event)}
            >
              <SessionItem
                selected={selected.toString() == thread._id}
                session={{
                  user: {
                    name: threadProfiles[index].name,
                    picture: "default-avatar.jpeg",
                  },
                  latestMsg: "",
                }}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-10 pb-5 rounded-md bg-white">
        <div className="flex justify-center">
          <Formik
            initialValues={{ message: "" }}
            enableReinitialize
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form className="flex justify-center w-full">
              <button
                className=" w-4/5 pb-2 mt-5 text-sky-50 rounded-lg"
                type="submit"
                style={{ background: "#4B47B7" }}
              >
                <div className="flex justify-center pt-1">START NEW CHAT</div>
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
