<script context="module" lang="ts">
  export async function load({ fetch }) {
    // fetch user data
    const defaultUserID = '61e25ca379e8e35b5ec98e76'
    const url = `/api/userdata?id=${defaultUserID}`
    const res = await fetch(url)

    if (res.ok) {
      return { props: { userData: await res.json() } }
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`)
    }
  }
</script>

<script lang="ts">
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query'
  import { Toasts } from 'as-toast'
  import App from '@components/App.svelte'
  import { currentUser } from '@store'
  import type { UserData } from '@types'

  export let userData: UserData
  currentUser.set(userData.currentUser)
  const queryClient = new QueryClient()
</script>

<svelte:head>
  <title>Home | Komento</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
  <App {userData} />
</QueryClientProvider>
<Toasts />

<style>
  /* Toast styles */
  :root {
    --as-toast-border: 1px solid #e8ebee;
    --as-toast-btn-border: none;
    --as-toast-info-border-color: #519259;
    --as-toast-info-background: #cee5d0;
    --as-toast-info-color: #519259;
    --as-toast-warn-border-color: #dd4a48;
    --as-toast-warn-background: #ffafaf;
    --as-toast-warn-color: #dd4a48;
  }
</style>
