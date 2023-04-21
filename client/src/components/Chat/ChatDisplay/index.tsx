import React, { useEffect, useRef } from "react";
import Message from "../Message";
import { useFormik } from "formik";
import SendIcon from "@mui/icons-material/Send";
import MessageModel from "../../../Models/MessageModel";
import UserProfileModel from "../../../Models/UserProfileModel";
import saveMessage from "../../../http/saveMessage";
import ThreadModel from "../../../Models/ThreadModel";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Socket } from "socket.io-client";
import { Button, IconButton, Chip, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

export interface MessageType {
  id: number;
  outbound: boolean;
  text: string;
}

const ChatDisplay: React.FC<{
  messages: MessageModel[] | null;
  setMessages: React.Dispatch<React.SetStateAction<MessageModel[]>> | null;
  uid: string;
  threadProfile: UserProfileModel | undefined;
  thread: ThreadModel;
  socket: Socket;
}> = ({ threadProfile, messages, setMessages, uid, thread, socket }) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    socket.on("receive-message", (newMsg) => {
      if (setMessages) {
        setMessages((prevMessages) => [...prevMessages, newMsg]);
      }
    });

    // Scroll to the last message whenever the messages state changes
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollTop = 0;
    }

    return () => {
      socket.off("receive-message");
      socket.disconnect();
    };
  }, [socket, messages]);
  useEffect(() => {
    if (lastMessageRef.current) {

      lastMessageRef.current.scrollTop = lastMessageRef.current.scrollHeight;
    }
  }, [lastMessageRef.current, messages])
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
            if (setMessages && messages) {
              setMessages([...messages, newMsg]);
            }
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
    <div className="mx-5 mt-5 h-min rounded-md bg-white dark:primary-dark">
      <div className="justify-start ml-10 my-3">
        <span className="text-sm font-bold">
          {t("chat.label.chatWith")}{" "}
          <span className="text-[#4B47B7], dark:text-[#706CC3]">
            {threadProfile ? threadProfile.name.toUpperCase() : ""}
          </span>
        </span>
      </div>
      <hr className="border-gray-100 border" />
      <div
        ref={lastMessageRef}
        className="w-11/12 h-[25rem] ml-5 mt-5 pb-5 inline-block overflow-y-auto scrolling-touch"
      >
        {messages ? messages.map((message) => (
          <div
            key={message._id}
            className={
              message.senderID == uid
                ? "ml-20 mt-2 justify-end flex"
                : "mx-5 mt-2 justify-start flex" + " flex"
            }
          >
            <Message
              outbound={message.senderID == uid}
              text={message.text}
              file={message.file}
            />

          </div>
        )) : <CircularProgress color="primary" className="relative left-[50%] top-[45%]" />}
      </div>
      <hr className="border-gray-100 border" />
      <div className="ml-8 my-2">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center">
            <input
              className="2xl:w-11/12 sm:w-4/5 w-3/5 h-16 bg-transparent mr-2 outline-none"
              type="text"
              name="text"
              placeholder={t('chat.label.writeMessage')!}
              value={formik.values.text}
              onChange={formik.handleChange}
            />
            <div className="flex items-center">
              {formik.values.messageFile && (
                <Chip
                  label={
                    formik.values.messageFile.name.substring(0, 10) + "..."
                  }
                  sx={{
                    margin: 1,
                    backgroundColor: "#4D47C3",
                    color: "white",
                    "& .MuiChip-deletable": { backgroundColor: "white" },
                  }}
                  onDelete={() => {
                    formik.setFieldValue("messageFile", null);
                  }}
                />
              )}
              <IconButton component="label" size="large" className="mr-4">
                <input
                  type="file"
                  name="file"
                  hidden
                  onChange={(event: any) => {
                    const file: FileList | null = event.currentTarget.files;
                    if (!file) return;
                    else {
                      formik.setFieldValue("messageFile", file[0]);
                    }
                  }}
                  accept="=.pdf, .doc, .docx, .txt, .xlsx"
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
