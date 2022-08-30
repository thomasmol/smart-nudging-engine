# Smart Nudging Engine

This is the codebase of the smart nudging engine as part of a master's thesis of the Business Informatics programme at the Utrecht University in 2022. 

This readme will be updated with instructions on how to install, use and extend this project.

Project stack:
* [SvelteKit](https://kit.svelte.dev) (webapp framework)
* [Prisma](https://prisma.io) (ORM)
* [PostgreSQL](https://postgresql.org) (database)
* [Nodejs](https://nodejs.org) (runtime env)


## Developing

Once you've cloned/forked the project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of the engine:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
