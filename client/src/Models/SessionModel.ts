import MessageType from "./MessageModel";
import UserInSearch from "./UsersInSearchModel";

export default interface SessionType {
    participants: UserInSearch[];
    messages: MessageType[];
};

// Just to show UI. 
export interface Thread {
    id: number;
    name: string;
    picture: string;
    latestMsg: string;
};