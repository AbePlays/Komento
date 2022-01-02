export interface Image {
  png: string
  webp: string
}

export interface User {
  image: Image
  username: string
}

export interface Reply {
  content: string
  createdAt: string
  dislikedByUser: boolean
  id: number
  likedByUser: boolean
  replyingTo: string
  score: number
  user: User
}

export interface Comment {
  content: string
  createdAt: string
  dislikedByUser: boolean
  id: number
  likedByUser: boolean
  replies: Reply[]
  score: number
  user: User
}

export interface UserData {
  comments: Comment[]
  currentUser: User
}
