import { Tweet } from "./tweet.model";

export interface Profile{
  username: string,
  password: string,
  authorFname: string,
  authorLname: string,
  tweets: Tweet[]
}
