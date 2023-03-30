export default interface MessageModel {
    _id: string;
    senderID: string;
    sender: {
        name: string;
        picture: string;
    }
    threadID: string;
    text: string;
    file: string | null;
    cretedAt: string;
    updatedAt: string;

}