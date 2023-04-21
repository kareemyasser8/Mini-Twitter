import { Tweet } from "./tweet.model";
import { Notification } from "../app/notification.modal";

export interface Profile {
  username: string,
  password: string,
  fname: string,
  lname: string,
  tweets: Tweet[]
  notifications: Notification[]
}
