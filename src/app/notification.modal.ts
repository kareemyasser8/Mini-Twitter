export interface Notification {
  type: string;
  message: string;
  timestamp: Date;
  read: boolean;
  senderId: {
    fname: string,
    lname: string,
    username: string
  }
  targetId: {
    _id: string,
    text: string,
    username: string,
    author: string
  }
}
