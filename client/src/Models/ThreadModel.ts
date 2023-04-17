import MessageModel from "./MessageModel";

export default interface ThreadModel {
    _id: string;
    participants: string[];
    messages: MessageModel[];
    createdAt: string;
    updatedAt: string;
};

// Just to show UI. 
export interface Thread {
    id: number;
    name: string;
    picture: string;
    latestMsg: string;
};