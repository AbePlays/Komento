<script lang="ts">
  export let isDisliked = false
  export let isLiked = false
  export let value = 0
  export let onIncrement: (e: MouseEvent) => void = () => {}
  export let onDecrement: (e: MouseEvent) => void = () => {}
</script>

<div
  class="flex flex-row md:flex-col gap-4 md:gap-2 items-baseline md:items-center justify-center bg-gray-100 w-min h-min px-4 md:px-2 rounded-lg font-semibold drop-shadow-sm"
>
  <button
    class={`p-1 hover:text-indigo-800 text-lg transition-colors ${
      isLiked ? 'text-indigo-800 font-semibold' : 'text-gray-400'
    }`}
    on:click={onIncrement}>+</button
  >
  <span class="text-indigo-800">{value}</span>
  <button
    class={`p-1 hover:text-indigo-800 text-lg transition-colors ${
      isDisliked ? 'text-indigo-800 font-semibold' : 'text-gray-400'
    }`}
    on:click={onDecrement}>-</button
  >
</div>
