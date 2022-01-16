export interface User {
  id: string
  image: string
  username: string
}

export interface Reply {
  content: string
  createdAt: string
  dislikedByUser: boolean
  id: string
  likedByUser: boolean
  replyingTo: string
  score: number
  user: User
}

export interface Comment {
  content: string
  createdAt: string
  dislikedByUser: boolean
  id: string
  likedByUser: boolean
  replies: Reply[]
  score: number
  user: User
}

export interface UserData {
  comments: Comment[]
  currentUser: User
}
