<script lang="ts">
  export let placeholder = ''
  export let id: string
  export let value: string
  export let onInput: (e: Event) => void
</script>

<!-- svelte-ignore a11y-autofocus -->
<textarea
  autofocus
  type="text"
  name={id}
  {id}
  class="w-full p-4 border border-gray-300 rounded-lg focus:ring-indigo-800 focus:border-indigo-800"
  rows="3"
  {placeholder}
  bind:value
  on:input={onInput}
/>
