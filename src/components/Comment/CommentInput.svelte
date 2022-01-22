<script lang="ts">
  import { useQueryClient } from '@sveltestack/svelte-query'
  import { addToast } from 'as-toast'
  import Button from '@components/Button.svelte'
  import Card from '@components/Card.svelte'
  import Input from '@components/Input.svelte'
  import { currentUser } from '@store'

  export let avatar: string
  export let btnText = 'Reply'
  export let onSubmit: (content: string) => void = null
  export let showCancel = false
  export let onCancel: () => void = () => {}
  let text = ''

  const queryClient = useQueryClient()

  const inputHanlder = (e: Event) => {
    text = (e.target as HTMLTextAreaElement).value
  }

  const submitHandler = () => {
    if (onSubmit) {
      onSubmit(text)
    } else {
      fetch('/api/comment', {
        body: JSON.stringify({ content: text, id: $currentUser.id }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      })
        .then(() => {
          addToast('Content added')
        })
        .catch(() => {
          addToast('Error adding content', 'warn')
        })
        .finally(() => {
          queryClient.invalidateQueries('userdata')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        })
    }
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
      <div class="flex gap-2 sm:flex-col">
        {#if showCancel}
          <Button
            classes="uppercase bg-red-600 bg-opacity-80"
            onClick={onCancel}>Cancel</Button
          >
        {/if}
        <Button classes="uppercase" type="submit">{btnText}</Button>
      </div>
    </div>
  </form>
</Card>
