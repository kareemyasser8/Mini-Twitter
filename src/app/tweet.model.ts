export interface Tweet{
  id: string,
  author: string,
  text: string,
  date: Date,
  likes: number,
  comments: number,
  replies: Tweet[]
}
