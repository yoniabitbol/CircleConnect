import React, {useEffect, useRef} from "react";
import Message from "../Message";
import { Field, Form, Formik } from "formik";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import MessageModel from "../../../Models/MessageModel";
import UserProfileModel from "../../../Models/UserProfileModel";
import saveMessage from "../../../http/saveMessage";
import ThreadModel from "../../../Models/ThreadModel";
import { Socket } from "socket.io-client";

export interface MessageType {
  id: number;
  outbound: boolean;
  text: string;
}

const ChatDisplay: React.FC<{
  messages: MessageModel[];
  setMessages: React.Dispatch<React.SetStateAction<MessageModel[]>>;
  uid: string;
  threadProfile: UserProfileModel | undefined;
  thread: ThreadModel;
  socket: Socket;
}> = ({ threadProfile, messages, setMessages, uid, thread, socket }) => {

  const lastMessageRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    socket.on("receive-message", (newMsg) => {
      setMessages((prevMessages) => [...prevMessages, newMsg]);
    });

    // Scroll to the last message whenever the messages state changes
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollTop = lastMessageRef.current.scrollHeight;
    }

    return () => {
      socket.off("receive-message");
      socket.disconnect();
    };
  }, [socket, messages]);

  return (
    <div  className="mx-5 mt-5 h-min rounded-md bg-white">
      <div className="justify-start ml-10 my-3">
        <span className="text-sm font-bold">
          CHAT WITH{" "}
          <span style={{ color: "#4B47B7" }}>
            {threadProfile ? threadProfile.name.toUpperCase() : ""}
          </span>
        </span>
      </div>
      <hr className="border-gray-100 border" />

      <div ref={lastMessageRef} className="w-11/12 h-[25rem] ml-5 mt-5 pb-5 inline-block overflow-y-auto scrolling-touch">
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
            const { message } = values;
            if (threadProfile) {
              saveMessage(thread._id, uid, message).then((res) => {
                if (res.status === "success" || res.ok) {
                  const newMsg = {
                    _id: Math.random().toString().substring(2),
                    threadID: thread._id,
                    senderID: uid,
                    sender: {
                      name: threadProfile?.name,
                      picture: threadProfile?.picture,
                    },
                    text: message,
                    file: null,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  };
                  setMessages([...messages, newMsg]);
                  socket.emit("send-message", {
                    senderID: newMsg.senderID,
                    threadID: newMsg.threadID,
                    text: newMsg.text,
                    file: newMsg.file,
                  });
                }
              });
            }

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
