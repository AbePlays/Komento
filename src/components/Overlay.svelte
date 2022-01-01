<script lang="ts">
  export let classes = ''
</script>

<div class={`bg-black bg-opacity-50 fixed inset-0 z-10 ${classes}`.trim()}>
  <div class="flex items-center justify-center h-full w-full">
    <slot />
  </div>
</div>
