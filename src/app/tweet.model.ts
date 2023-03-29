export interface Tweet{
  author: string,
  text: string,
  date: Date,
  likes: number,
  comments: number,
  replies: Tweet[]
}
