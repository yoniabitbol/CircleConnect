export default interface MessageModel {
    _id: string;
    senderID: string;
    threadID: string;
    text: string;
    file: string | null;
    cretedAt: string;
    updatedAt: string;

}