export interface Tweet{
  text: string,
  author: string,
  authorId: string,
  username: string,
  date: Date,
  likes: number,
  comments: number,
  replies: Tweet[],
  id: string
}

