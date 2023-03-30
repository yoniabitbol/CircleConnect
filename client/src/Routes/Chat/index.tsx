import React, { useState } from "react";
import Chat from "../../components/Chat";
import { useEffect } from "react";
import getCurrentUserThreads from "../../http/getCurrentUserThreads";
import ThreadModel from "../../Models/ThreadModel";
import getUserConnections from "../../http/getUserConnections";
import { auth } from "../../firebase/config";
import UserProfileModel from "../../Models/UserProfileModel";

const ChatPage: React.FC = () => {
  const [threads, setThreads] = useState<ThreadModel[]>([]);
  let receivingParticipants: string[] = [];
  const [connections, setConnections] = useState<UserProfileModel[]>([]);
  const uid = auth.currentUser?.uid;
  

  useEffect(() => {
    getCurrentUserThreads().then((res) => {
      setThreads(res.data.threads);
    });

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
          threads={threads}
          connections={connections}
          receivingParticipants={receivingParticipants}
          uid={uid}
        />
      ) : (
        // Replace with loading bar in the future
        <div>Loading...</div>
      )}
    </>
  );
};

export default ChatPage;
