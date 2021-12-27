import vercel from '@sveltejs/adapter-vercel'
import path from 'path'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [preprocess({})],
  kit: {
    adapter: vercel(),
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      resolve: {
        alias: {
          '@components': path.resolve('./src/components'),
          '@types': path.resolve('./src/types'),
          '@utils': path.resolve('./src/utils')
        }
      }
    }
  }
}

export default config
