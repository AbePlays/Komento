<script context="module" lang="ts">
  export async function load({ fetch }) {
    // fetch user data
    const url = 'data.json'
    const res = await fetch(url)

    if (res.ok) {
      return {
        props: {
          userData: await res.json()
        }
      }
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`)
    }
  }
</script>

<script lang="ts">
  import CommentContainer from '@components/Comment/CommentContainer.svelte'
  import CommentInput from '@components/Comment/CommentInput.svelte'
  import { comments, currentUser } from '@store'
  import type { UserData } from '@types'

  export let userData: UserData
  const { currentUser: user, comments: userComments } = userData

  currentUser.set(user)
  comments.set(userComments)
</script>

<svelte:head>
  <title>Home | Komento</title>
</svelte:head>

<div class="bg-gray-100 min-h-screen">
  <div class="max-w-screen-md mx-auto">
    <section class="px-4 pt-8 pb-2 space-y-4">
      {#each $comments as comment (comment.id)}
        <CommentContainer {comment} replies={comment.replies} />
      {/each}
    </section>
    <section class="sm:sticky sm:bottom-0 w-full p-4 pb-8 bg-gray-100">
      <CommentInput avatar={user.image.png} btnText="Send" />
    </section>
  </div>
</div>
