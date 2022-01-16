<script lang="ts">
  import { afterUpdate } from 'svelte'
  import { scale, slide } from 'svelte/transition'
  import { useQueryClient } from '@sveltestack/svelte-query'
  import Button from '@components/Button.svelte'
  import Card from '@components/Card.svelte'
  import CommentInput from './CommentInput.svelte'
  import Counter from '@components/Counter.svelte'
  import Input from '@components/Input.svelte'
  import Modal from '@components/Modal.svelte'
  import Overlay from '@components/Overlay.svelte'
  import { currentUser } from '@store'
  import type { Comment } from '@types'
  import { timeDifference } from '@utils'

  export let data: Comment
  let isEditing = false
  let showModal = false
  let showReply = false
  let element: HTMLElement = null
  let value = data.content

  const queryClient = useQueryClient()

  afterUpdate(() => {
    if (showReply && element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  })

  const inputHandler = (e: Event) => {
    value = (e.target as HTMLTextAreaElement).value
  }

  const deleteComment = () => {
    fetch(`/api/comment?id=${data.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }).finally(() => {
      showModal = false
      queryClient.invalidateQueries('userdata')
    })
  }

  const submitReply = (text: string) => {
    if (text.trim().length > 0) {
      fetch('/api/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commentId: data.id,
          content: text,
          userId: $currentUser.id,
          replyingTo: data.user.id
        })
      }).finally(() => {
        showReply = false
        queryClient.invalidateQueries('userdata')
      })
    }
  }

  const updateComment = () => {
    if (value.trim().length > 0) {
      fetch('/api/comment', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: value, id: data.id })
      }).finally(() => {
        isEditing = false
        queryClient.invalidateQueries('userdata')
      })
    }
  }

  const upvoteHandler = () => {
    fetch('/api/comment/upvote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentId: data.id, userId: $currentUser.id })
    }).finally(() => {
      queryClient.invalidateQueries('userdata')
    })
  }

  const downvoteHandler = () => {
    fetch('/api/comment/downvote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentId: data.id, userId: $currentUser.id })
    }).finally(() => {
      queryClient.invalidateQueries('userdata')
    })
  }

  const toggleEditing = () => (isEditing = !isEditing)
  const toggleModal = () => (showModal = !showModal)
  const toggleReply = () => (showReply = !showReply)

  const isCommentFromUser = data.user.username === $currentUser.username
</script>

<Card classes="flex flex-col md:flex-row-reverse gap-4 md:gap-6 relative">
  <div class="space-y-4 w-full">
    <div class="flex items-center gap-4">
      <img
        src={data.user.image}
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
    {#if isEditing}
      <label for="reply" class="sr-only">Reply</label>
      <Input id="reply" value={data.content} onInput={inputHandler} />
      <div class="flex gap-2 justify-end">
        <Button
          classes="uppercase bg-red-600 bg-opacity-80"
          onClick={toggleEditing}
        >
          Cancel</Button
        >
        <Button classes="uppercase" onClick={updateComment}>Update</Button>
      </div>
    {:else}
      <p class="text-gray-500">{data.content}</p>
    {/if}
  </div>
  <Counter
    isDisliked={data.dislikedByUser}
    isLiked={data.likedByUser}
    onDecrement={downvoteHandler}
    onIncrement={upvoteHandler}
    value={data.score}
  />
  <div class="absolute bottom-5 right-5 md:top-5 md:bottom-auto flex gap-2">
    {#if isCommentFromUser}
      <Button
        variant="ghost"
        classes="flex items-center gap-2 text-[#ED6368]"
        onClick={toggleModal}
      >
        <img src="/icon-delete.svg" alt="" />
        Delete
      </Button>
      <Button
        variant="ghost"
        classes="flex items-center gap-2"
        onClick={toggleEditing}
      >
        <img src="/icon-edit.svg" alt="" />
        Edit
      </Button>
    {:else}
      <Button
        variant="ghost"
        classes="flex items-center gap-2"
        onClick={toggleReply}
      >
        <img src="/icon-reply.svg" alt="" />
        Reply
      </Button>
    {/if}
  </div>
</Card>
{#if showModal}
  <Overlay classes="!m-0">
    <div in:scale>
      <Modal classes="mx-4" onAccept={deleteComment} onDecline={toggleModal} />
    </div>
  </Overlay>
{/if}
{#if showReply}
  <div bind:this={element} in:slide={{ delay: 200 }} out:slide>
    <CommentInput
      showCancel
      avatar={$currentUser.image}
      onCancel={toggleReply}
      onSubmit={submitReply}
    />
  </div>
{/if}
