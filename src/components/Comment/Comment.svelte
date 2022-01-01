<script lang="ts">
  import Button from '@components/Button.svelte'
  import Card from '@components/Card.svelte'
  import CommentInput from './CommentInput.svelte'
  import Counter from '@components/Counter.svelte'
  import Input from '@components/Input.svelte'
  import Modal from '@components/Modal.svelte'
  import Overlay from '@components/Overlay.svelte'
  import { comments, currentUser } from '@store'
  import type { Comment, Reply } from '@types'
  import { timeDifference } from '@utils'

  export let data: Comment
  let isEditing = false
  let showModal = false
  let showReply = false
  let value = data.content

  const inputHandler = (e: Event) => {
    value = (e.target as HTMLTextAreaElement).value
  }

  const deleteHandler = () => {
    comments.update((comments) =>
      comments.filter((comment) => comment.id !== data.id)
    )
    showModal = false
  }

  const submitHandler = (text: string) => {
    const newComments = $comments.map((comment) => {
      if (comment.id === data.id) {
        const { replies } = comment
        const newReply: Reply = {
          content: text,
          createdAt: new Date().toISOString(),
          id: Math.random(),
          user: $currentUser,
          replyingTo: comment.user.username,
          score: 0
        }
        replies.push(newReply)
      }
      return comment
    })
    comments.set(newComments)
    showReply = false
  }

  const updateComment = () => {
    comments.update((prevComments) => {
      const newComments = prevComments.map((comment) => {
        if (comment.id === data.id) {
          comment.content = value
        }
        return comment
      })
      return newComments
    })
    isEditing = false
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
    {#if isEditing}
      <label for="reply" class="sr-only">Reply</label>
      <Input id="reply" {value} onInput={inputHandler} />
      <div class="text-right">
        <Button classes="uppercase ml-auto" onClick={updateComment}>
          Update</Button
        >
      </div>
    {:else}
      <p class="text-gray-500">{data.content}</p>
    {/if}
  </div>
  <Counter value={data.score} />
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
    <Modal onAccept={deleteHandler} onDecline={toggleModal} />
  </Overlay>
{/if}
{#if showReply}
  <CommentInput avatar={$currentUser.image.png} onSubmit={submitHandler} />
{/if}
