import React, { useEffect, useRef } from "react";
import Message from "../Message";
import {useFormik } from "formik";
import SendIcon from "@mui/icons-material/Send";
import MessageModel from "../../../Models/MessageModel";
import UserProfileModel from "../../../Models/UserProfileModel";
import saveMessage from "../../../http/saveMessage";
import ThreadModel from "../../../Models/ThreadModel";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Socket } from "socket.io-client";
import sendNotification from "../../../http/sendNotification";
import { Button, IconButton, Chip } from "@mui/material";

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

    const formik = useFormik({
        initialValues: {
            thread_id: thread._id,
            outbound: true,
            text: "",
            messageFile: null,
        },
        onSubmit: (values: any, { resetForm }) => {
            //prevent default

            if (values.text.trim() === "" && values.messageFile === null) {
                // Check if message is empty or contains only whitespace
                return; // Exit early without sending message
            }
            //create formData
            const formData = new FormData();
            console.log('values',values);
            for (const key in values) {
                formData.append(key, values[key]);
            }
            formData.append("senderID", uid);
            if (threadProfile) {
                saveMessage(formData).then((res) => {
                    if (res.status === "success" || res.ok) {
                        const newMsg = {
                            _id: Math.random().toString().substring(2),
                            threadID: thread._id,
                            senderID: uid,
                            sender: {
                                name: threadProfile?.name,
                                picture: threadProfile?.picture,
                            },
                            text: values.text,
                            file: values.messageFile,
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
        },
    });
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

      <div
        ref={lastMessageRef}
        className="w-11/12 h-[25rem] ml-5 mt-5 pb-5 inline-block overflow-y-auto scrolling-touch"
      >
        {messages &&
          messages.map((message) => (
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
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center">
              <input
                className="2xl:w-11/12 sm:w-4/5 w-3/5 h-16 bg-transparent mr-2 outline-none"
                type="text"
                name="text"
                placeholder="Write your message"
                value={formik.values.text}
                onChange={formik.handleChange}
              />
              <div className="flex items-center">
                  {formik.values.messageFile && <Chip
                  label={formik.values.messageFile.name.substring(0, 10) + "..."}
                  sx={{
                    margin: 1,
                    backgroundColor: "#4D47C3",
                    color: "white",
                    "& .MuiChip-deletable": { backgroundColor: "white" },
                  }}
                    onDelete={() => {
                        formik.setFieldValue("messageFile", null);
                    }}
                />}
                <IconButton component="label" size="large" className="mr-4">
                  <input
                    type="file"
                    name="file"
                    hidden
                    onChange={(event: any) => {
                        const file: FileList | null = event.currentTarget.files;
                        if (!file) return;
                        else {
                            formik.setFieldValue('messageFile', file[0]);
                        }
                    }}

                    accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                                        text/plain, application/pdf, image/*"
                  />
                  <AttachFileIcon />
                </IconButton>
                <Button
                  className="mx-5 border h-10 w-10 rounded-lg"
                  type="submit"
                  variant="contained"
                >
                  <SendIcon className="text-white" />
                </Button>
              </div>
            </div>
          </form>
      </div>
    </div>
  );
};

export default ChatDisplay;
