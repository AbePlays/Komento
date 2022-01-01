<script lang="ts">
  import Button from './Button.svelte'

  export let classes = ''
  export let onAccept: () => void = () => {}
  export let onDecline: () => void = () => {}
</script>

<div
  class={`max-w-sm md:max-w-[420px] md:max mx-auto bg-gray-100 px-4 py-6 md:p-8 space-y-5 text-gray-500 rounded-lg shadow-xl ${classes}`.trim()}
>
  <h2 class="font-bold text-lg md:text-xl text-gray-700">Delete comment</h2>
  <p class="md:text-lg">
    Are you sure you want to delete this comment? This will remove the comment
    and can&apos;t be undone.
  </p>
  <div class="flex gap-4">
    <Button classes="w-full bg-gray-500 uppercase" onClick={onDecline}
      >No, Cancel</Button
    >
    <Button
      classes="w-full bg-red-600 bg-opacity-80 uppercase"
      onClick={onAccept}>Yes, Delete</Button
    >
  </div>
</div>
