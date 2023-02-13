import React from "react";
import SessionItem from "../SessionItem";
import {Form, Formik} from "formik";

const Sessions: React.FC = () => {
  return (
    <div>
      <div className="ml-15 mt-5 pb-5 rounded-md bg-slate-200 overflow-auto">
        <div className="justify-start ml-10 my-6">
          <span className="text-sm">CHATS</span>
        </div>
        <hr className="border-gray-400 border" />
        <SessionItem
          selected={true}
          session={{
            user: {
              name: "Chad Thundercock",
              picture: "https://cdn.discordapp.com/attachments/800804024109891595/1067509878534438972/IMG_20220119_162228_138.jpg",
            },
            latestMsg: "Hey gamer",
          }}
        />
        <SessionItem
          selected={false}
          session={{
            user: {
              name: "Hungry Boi",
              picture: "https://cdn.discordapp.com/attachments/672975677460447232/1072778010597535784/photo_2022-05-21_09-09-15.jpg",
            },
            latestMsg: "Are you food",
          }}
        />
      </div>

      <div className="mt-10 pb-5 rounded-md bg-slate-200">
        <div className="flex justify-center">
          <Formik
            initialValues={{message: ""}}
            enableReinitialize
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form className="flex justify-center w-full">
              <button className="bg-indigo-900 w-4/5 pb-2 mt-5 text-sky-50 rounded-lg" type="submit">
                <div className="flex justify-center">
                  START NEW CHAT
                </div>
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>);
};

export default Sessions;