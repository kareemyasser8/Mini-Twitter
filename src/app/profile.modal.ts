import { Tweet } from "./tweet.model";

export interface Profile{
  username: string,
  password: string,
  fname: string,
  lname: string,
  tweets: Tweet[]
  notifications: string[]
}
