export type IMessage = {
  createdAt: { seconds: number };
  reciever: string;
  recieverID: string;
  sender: string;
  senderID: string;
  text: string;
  send?: string;
  type: string;
};
