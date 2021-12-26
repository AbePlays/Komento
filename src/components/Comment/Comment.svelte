<script lang="ts">
  import Button from '@components/Button.svelte'
  import Card from '@components/Card.svelte'
  import Counter from '@components/Counter.svelte'
  import CommentInput from './CommentInput.svelte'
  import replySvg from '/icon-reply.svg'

  export let data: TCommentData = {
    id: 0,
    author: 'amy',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    likes: 0,
    date: new Date().toISOString(),
    photoUrl: 'https://picsum.photos/200/300'
  }
</script>

<Card classes="flex flex-col md:flex-row-reverse gap-4 md:gap-6 relative">
  <div class="space-y-4">
    <div class="flex items-center gap-4">
      <img
        src={data.photoUrl}
        alt="author avatar"
        class="rounded-full w-10 h-10"
      />
      <span>{data.author}</span>
      <span class="text-gray-500">{data.date}</span>
    </div>
    <p class="text-gray-500">{data.text}</p>
  </div>
  <Counter />
  <Button
    variant="ghost"
    classes="absolute bottom-5 right-5 md:top-5 md:bottom-auto flex items-center gap-2"
  >
    <img src={replySvg} alt="" />
    Reply
  </Button>
</Card>
<CommentInput avatar={data.photoUrl} />
