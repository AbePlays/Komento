# Komento

Komento is an interactive comments section. The app is server rendered and the server cache on client-side is handled by `svelte-query` to provide optimistic updates 😇

Current Implementation involves following functionality:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote content

<br />

<div align="center">

<a href="https://komento.vercel.app">View App</a>
·
<a href="https://github.com/AbePlays/Komento/issues">Report Bug</a>
·
<a href="https://github.com/AbePlays/Komento/issues">Request Feature</a>

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Design preview for the Interactive comments section coding challenge](./desktop-preview.jpg)

### Expected behaviour

- Replying to a comment adds the new reply to the bottom of the nested replies within that comment.
- A confirmation modal should pop up before a comment or reply is deleted.
- Adding a new comment or reply uses the `currentUser` returned from the server on initial page load.
- You can only edit or delete your own comments and replies.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Sveltekit](https://kit.svelte.dev/)
- [Vercel](https://vercel.com)
- [Tailwind](https://tailwindcss.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Prisma](https://www.prisma.io/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/AbePlays/Komento.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run locally

   ```sh
   npm run dev

   # or start the server and open the app in a new browser tab
   npm run dev -- --open
   ```

4. Build project

   ```sh
   npm run build
   ```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>
