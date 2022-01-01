import { writable } from 'svelte/store'

import type { Comment, User } from '@types'

export const comments = writable<Array<Comment>>([])
export const currentUser = writable<User>(null)
