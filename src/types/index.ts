export interface Image {
  png: string
  webp: string
}

export interface User {
  image: Image
  username: string
}

export interface Reply {
  id: number
  content: string
  createdAt: string
  score: number
  replyingTo: string
  user: User
}

export interface Comment {
  id: number
  content: string
  createdAt: string
  score: number
  user: User
  replies: Reply[]
}

export interface UserData {
  currentUser: User
  comments: Comment[]
}
