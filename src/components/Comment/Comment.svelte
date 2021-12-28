<script lang="ts">
  import Button from '@components/Button.svelte'
  import Card from '@components/Card.svelte'
  import Counter from '@components/Counter.svelte'
  import type { Comment, Reply } from '@types'
  import { timeDifference } from '@utils'
  import CommentInput from './CommentInput.svelte'

  export let data: Comment = {
    id: 1,
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: '2021-12-27T16:57:00.067Z',
    score: 12,
    user: {
      image: {
        png: '/avatars/image-amyrobson.png',
        webp: '/avatars/image-amyrobson.webp'
      },
      username: 'amyrobson'
    },
    replies: []
  }
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
    <p class="text-gray-500">{data.content}</p>
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
<!-- <CommentInput avatar={data.user.image.png} /> -->
