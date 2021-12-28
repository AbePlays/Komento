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
  import type { UserData } from '@types'

  export let userData: UserData
  const { currentUser, comments } = userData
</script>

<svelte:head>
  <title>Home | Komento</title>
</svelte:head>

<div class="bg-gray-100 min-h-screen">
  <div class="max-w-screen-md mx-auto px-4 py-8 space-y-4">
    {#each comments as comment}
      <CommentContainer {comment} replies={comment.replies} />
    {/each}
    <CommentInput avatar={currentUser.image.png} btnText="Send" />
  </div>
</div>
