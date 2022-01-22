<script lang="ts">
  import { useQuery } from '@sveltestack/svelte-query'
  import CommentContainer from '@components/Comment/CommentContainer.svelte'
  import CommentInput from '@components/Comment/CommentInput.svelte'
  import type { UserData } from '@types'

  export let userData: UserData

  const defaultUserID = '61e25ca379e8e35b5ec98e76'

  const queryResult = useQuery(
    'userdata',
    async () => {
      const res = await fetch(`/api/userdata?id=${defaultUserID}`)
      return res.json()
    },
    { initialData: userData }
  )

  $: comments = $queryResult.data.comments
  $: user = $queryResult.data.currentUser
</script>

<div class="bg-gray-100 min-h-screen">
  <div class="max-w-screen-md mx-auto">
    <section class="px-4 pt-8 pb-2 space-y-4">
      {#each comments as comment (comment.id)}
        <CommentContainer {comment} replies={comment.replies} />
      {/each}
    </section>
    <section class="sm:sticky sm:bottom-0 w-full p-4 pb-8 bg-gray-100">
      <CommentInput avatar={user.image} btnText="Send" />
    </section>
  </div>
</div>
