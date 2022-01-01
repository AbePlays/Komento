<script lang="ts">
  import type { Comment as TComment, Reply as TReply } from '@types'
  import Comment from './Comment.svelte'
  import Reply from './Reply.svelte'

  export let comment: TComment
  export let replies: Array<TReply>
</script>

<Comment data={comment} />
<div class="space-y-4 pl-4 sm:pl-8 sm:ml-8 border-l-2 border-l-gray-200">
  {#each replies as reply (reply.id)}
    <Reply data={reply} />
  {/each}
</div>
