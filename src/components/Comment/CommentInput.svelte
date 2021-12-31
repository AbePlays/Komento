<script lang="ts">
  import Button from '@components/Button.svelte'
  import Card from '@components/Card.svelte'
  import Input from '@components/Input.svelte'
  import { comments, currentUser } from '@store'
  import type { Comment } from '@types'

  export let avatar: string
  export let btnText = 'Reply'
  let text = ''

  const inputHanlder = (e: Event) => {
    text = (e.target as HTMLTextAreaElement).value
  }

  const submitHandler = () => {
    const newComment: Comment = {
      content: text,
      createdAt: new Date().toISOString(),
      id: Math.random(),
      replies: [],
      score: 0,
      user: $currentUser
    }
    comments.update((comments) => [newComment, ...comments])
    window.scrollTo({ top: 0, behavior: 'smooth' })
    text = ''
  }
</script>

<Card>
  <form
    class="flex flex-col md:flex-row md:items-start gap-4"
    on:submit|preventDefault={submitHandler}
  >
    <div class="flex w-full gap-4">
      <img
        src={avatar}
        alt="author avatar"
        class="hidden md:block w-10 h-10 shrink-0 rounded-full"
      />
      <label for="comment" class="sr-only">Comment</label>
      <Input
        id="comment"
        placeholder="Add a comment..."
        value={text}
        onInput={inputHanlder}
      />
    </div>
    <div class="flex items-center justify-between">
      <img
        src={avatar}
        alt="author avatar"
        class="block md:hidden h-10 w-10 rounded-full"
      />
      <Button classes="uppercase" type="submit">{btnText}</Button>
    </div>
  </form>
</Card>
