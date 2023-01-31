# Jeoparody

An multiplayer online version of the popular game show Jeopardy

## Running Locally

Requires [Node.js](https://nodejs.org/en) version 16+
`$ git clone https://github.com/BlakeIsMyWaifu/Jeoparody`
`$ yarn install`
rename `.env.example` to `.env`

To run the development server
`$ yarn dev`

To build and run a production build
`$ yarn build`
`$ yarn start`
`$ yarn open-browser`

## Deployment

The project contains a [`render.yaml`](./render.yaml) [_"Blueprint"_](https://render.com/docs/blueprint-spec) which makes the project easily deployable on [Render](https://render.com)

1. Login or create an account on [render](https://render.com). This project can be ran on a free account with no credit card required.
2. Create a new blueprint instance on the [dashboard](https://dashboard.render.com/blueprints) and add the [repository](https://github.com/BlakeIsMyWaifu/Jeoparody) in the public git repository section.
3. Once you've been given your project domain, change your environment variable to point to the create address. Both `APP_URL` and `WS_URL` need to be updated. Make sure you use the same format as the default variables.

After it's finished building, it's all ready to use.

## Technologies Used

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/) - End to end API
- [ws](https://github.com/websockets/ws) - Websocket server
- [Zustand](https://zustand-demo.pmnd.rs/) - Both frontend and backend state management
- [Mantine](https://mantine.dev/) - Component and style library
