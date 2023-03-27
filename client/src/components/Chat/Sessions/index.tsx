import React from "react";
import SessionItem from "../SessionItem";
import { Form, Formik } from "formik";

export interface SessionType {
  id: number;
  name: string;
  picture: string;
  latestMsg: string;
}

const Sessions: React.FC<{
  sessions: SessionType[];
  selectSession: (event: any) => void;
  selected: number;
}> = ({ sessions, selectSession, selected }) => {
  return (
    <div>
      <div className="ml-15 mt-5 pb-5 rounded-md bg-white overflow-auto">
        <div className="justify-start ml-10 my-6">
          <span className="text-sm font-bold">CHATS</span>
        </div>
        <hr className="border-gray-100 border" />
        {sessions.map((sessionInMap) => (
          <button
            className="w-full h-full"
            key={sessionInMap.id}
            data-key={sessionInMap.id}
            type="submit"
            onClick={(event) => selectSession(event)}
          >
            <SessionItem
              selected={selected == sessionInMap.id}
              session={{
                user: {
                  name: sessionInMap.name,
                  picture: sessionInMap.picture,
                },
                latestMsg: sessionInMap.latestMsg,
              }}
            />
          </button>
        ))}
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
