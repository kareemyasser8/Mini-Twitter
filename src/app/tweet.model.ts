export interface Tweet{
  id: number,
  author: string,
  text: string,
  date: Date,
  likes: number,
  comments: number,
  replies: Tweet[]
}
