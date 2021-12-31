<script lang="ts">
  import Button from '@components/Button.svelte'
  import Card from '@components/Card.svelte'
  import Counter from '@components/Counter.svelte'
  import { comments, currentUser } from '@store'
  import type { Comment } from '@types'
  import { timeDifference } from '@utils'

  export let data: Comment

  const deleteHanlder = () => {
    comments.update((comments) =>
      comments.filter((comment) => comment.id !== data.id)
    )
  }

  const isCommentFromUser = data.user.username === $currentUser.username
</script>

<Card classes="flex flex-col md:flex-row-reverse gap-4 md:gap-6 relative">
  <div class="space-y-4 w-full">
    <div class="flex items-center gap-4">
      <img
        src={data.user.image.png}
        alt="author avatar"
        class="rounded-full w-10 h-10"
      />
      <div>
        <span class="font-medium">{data.user.username}</span>
        {#if isCommentFromUser}
          <span class="text-white bg-indigo-800 px-2 py-0.5 ml-1 rounded-sm"
            >you</span
          >
        {/if}
      </div>
      <span class="text-gray-500"
        >{timeDifference(new Date(data.createdAt))}</span
      >
    </div>
    <p class="text-gray-500">{data.content}</p>
  </div>
  <Counter value={data.score} />
  <div class="absolute bottom-5 right-5 md:top-5 md:bottom-auto flex gap-2">
    {#if isCommentFromUser}
      <Button
        variant="ghost"
        classes="flex items-center gap-2 text-[#ED6368]"
        onClick={deleteHanlder}
      >
        <img src="/icon-delete.svg" alt="" />
        Delete
      </Button>
    {/if}
    <Button variant="ghost" classes="flex items-center gap-2">
      <img src="/icon-reply.svg" alt="" />
      Reply
    </Button>
  </div>
</Card>
