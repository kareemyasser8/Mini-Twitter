export interface Notification {
  id: string;
  type: string;
  message: string;
  timestamp: Date;
  read: boolean;
  senderId: string;
  senderName: string;
  targetId: string;
}
