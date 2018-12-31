import { User } from './User';


export class Message {
     messageId: number;
     content: string;
     sender: User | null;
     senderID: number;
     receiver: User;
     receiverID: number
     isRead: boolean;
     dateSend: Date;
}