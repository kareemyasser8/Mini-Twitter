export interface Tweet{
  text: string,
  author: string,
  authorId: string,
  username: string,
  date: Date,
  likes: number,
  comments: number,
  likedBy: string[]
  commentedBy: string[]
  replies: Tweet[],
  id: string
}

