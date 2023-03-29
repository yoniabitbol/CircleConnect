import SessionType from "./SessionModel";

export default interface MessageType {
    senderID: string;
    threadID: SessionType;
    text: string;
    file: string;
}