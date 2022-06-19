# React-EventChannel

This project uses the pubsub design pattern in the development practice of React. The Event Channel can solve the state coupling problem between modules and modules, so that each modules can manage its own state, and doesn't manage other module states that don't belong to this responsibility, such as the problem that the parent component manages too many child component states.

## Tech Stack

-   TypeScript 4.6
-   Vite 2.9
-   React 18.0

## Quick Start

run `npm i && npm start` to start project

## Directory Layout

```
├── index.html
├── package-lock.json
├── package.json           # The list of project dependencies
├── readme.md
├── src
│   ├── App.tsx            # Demo parent Component
│   ├── Main.tsx           # React Entrypoint
│   ├── child.tsx          # Demo child Component
│   ├── eventChannel.ts    # Event operation common method
│   ├── eventGateway.tsx   # Event exchange center
│   └── vite-env.d.ts
├── tsconfig.json          # TS settings file
├── tsconfig.node.json     # TS settings file
└── vite.config.ts         # Vite settings file
```
