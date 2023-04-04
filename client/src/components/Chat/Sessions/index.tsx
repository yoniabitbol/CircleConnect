import React from "react";
import SessionItem from "../SessionItem";
import { Form, Formik, Field } from "formik";
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
  connections: UserProfileModel[];
}> = ({ threads, selectThread, selected, threadProfiles, connections }) => {
  // Get the profiles who you DON'T have a conversation with yet
  const filteredConnections = connections.filter(
    (conn) =>
      !threadProfiles.map((profile) => profile.user_id).includes(conn.user_id)
  );
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
              data-key={index}
              type="submit"
              onClick={(event) => selectThread(event)}
            >
              <SessionItem
                selected={selected == index}
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
            initialValues={{ chatTarget: "" }}
            enableReinitialize
            onSubmit={(values) => {
              const { chatTarget } = values;
              if (chatTarget == "") {
                alert("Please select a connection");
                return;
              } else {
                console.log("User id: " +chatTarget);
              }
            }}
          >
            <Form className="flex flex-col justify-center w-full">
              {filteredConnections.length > 0 ? (
                <Field as="select" name="chatTarget">
                  <option value="">Select a connection</option>
                  {filteredConnections.map((conn) => (
                    <option key={conn.user_id} value={conn.user_id}>
                      {conn.name}
                    </option>
                  ))}
                </Field>
              ) : (
                <div>You have a conversation with each connection</div>
              )}

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
