<script lang="ts">
  export let classes = ''
  export let variant: 'solid' | 'ghost' = 'solid'
  export let onClick: (e: MouseEvent) => void = () => {}
  export let type: 'button' | 'submit' = 'button'

  // setting class names
  let classList = ''
  if (variant === 'solid') {
    classList = 'bg-indigo-800 text-white rounded-lg px-5 py-3'
  } else if (variant === 'ghost') {
    classList = 'text-indigo-800 px-2 py-1'
  }
  classList = `${classList} ${classes}`
</script>

<button
  class={`font-medium hover:opacity-30 transition-opacity ${classList}`.trim()}
  {type}
  on:click={onClick}
>
  <slot />
</button>
