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
