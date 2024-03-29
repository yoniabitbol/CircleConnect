import React, { useState } from "react";
import Chat from "../../components/Chat";
import { useEffect } from "react";
import getCurrentUserThreads from "../../http/getCurrentUserThreads";
import ThreadModel from "../../Models/ThreadModel";
import getUserConnections from "../../http/getUserConnections";
import { auth } from "../../firebase/config";
import UserProfileModel from "../../Models/UserProfileModel";
import { useParams } from "react-router-dom";
import markMessageNotificationsRead from "../../http/markMessageNotificationsRead";

const ChatPage: React.FC = () => {
  useEffect(() => {
    markMessageNotificationsRead();
    return () => {
      markMessageNotificationsRead();
    };
  });

  const [threads, setThreads] = useState<ThreadModel[]>([]);
  let receivingParticipants: string[] = [];
  const [connections, setConnections] = useState<UserProfileModel[]>([]);
  const uid = auth.currentUser?.uid;
  const [chatId, setChatId] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id) {
      setChatId(id);
    }
  }, [id]);

  const refreshThreads = () => {
    getCurrentUserThreads().then((res) => {
      setThreads(res.data.threads);
    });
  };

  useEffect(() => {
    refreshThreads();

    uid &&
      getUserConnections(uid).then((res) => {
        setConnections(res.data.connections);
      });
  }, [uid]);

  if (threads && uid) {
    receivingParticipants = threads.map((thread) => {
      if (thread.participants[0] != uid) {
        return thread.participants[0];
      } else {
        return thread.participants[1];
      }
    });
  }

  return (
    <>
      {threads && connections && uid && receivingParticipants ? (
        <Chat
          chatId={chatId}
          threads={threads}
          connections={connections}
          receivingParticipants={receivingParticipants}
          uid={uid}
          refreshThreads={refreshThreads}
        />
      ) : (
        // Replace with loading bar in the future
        <div>Loading...</div>
      )}
    </>
  );
};

export default ChatPage;
