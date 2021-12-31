<script lang="ts">
  import Button from '@components/Button.svelte'
  import Card from '@components/Card.svelte'
  import Counter from '@components/Counter.svelte'
  import type { Reply } from '@types'
  import { timeDifference } from '@utils'

  export let data: Reply
</script>

<Card classes="flex flex-col md:flex-row-reverse gap-4 md:gap-6 relative">
  <div class="space-y-4">
    <div class="flex items-center gap-4">
      <img
        src={data.user.image.png}
        alt="author avatar"
        class="rounded-full w-10 h-10"
      />
      <span class="font-medium">{data.user.username}</span>
      <span class="text-gray-500"
        >{timeDifference(new Date(data.createdAt))}</span
      >
    </div>
    <p class="text-gray-500">
      <span class="text-indigo-800 font-medium">@{data.replyingTo}</span>
      {data.content}
    </p>
  </div>
  <Counter value={data.score} />
  <Button
    variant="ghost"
    classes="absolute bottom-5 right-5 md:top-5 md:bottom-auto flex items-center gap-2"
  >
    <img src="/icon-reply.svg" alt="" />
    Reply
  </Button>
</Card>
