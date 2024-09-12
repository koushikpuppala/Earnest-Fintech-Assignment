# Frontend

This is the frontend of the Earnest Fintech Assignment. It is built using Next.js and Tailwind CSS. It is a simple web application that allows users to view the list of tasks and filter them based on the task status.

## Table of Contents

-   [Installation](#installation)
-   [Configuration](#configuration)
-   [Running the Application](#running-the-application)
-   [Folder Structure](#folder-structure)
-   [License](#license)

## Installation

Clone the repository:

```bash
git clone https://github.com/koushikpuppala/earnest-fintech-assignment.git
```

Navigate to the frontend directory:

```bash
cd earnest-fintech-assignment/frontend
```

To install the dependencies, run:

```bash
yarn install
```

## Configuration

Create a `.env` file in the root directory of the frontend and fill the details as shown in the `.env.example` file.

## Running the Application

To start the server in development mode, run:

```bash
yarn dev
```

The server will start at [http://localhost:3000](http://localhost:3000).

To start the server in production mode, run:

First, build the application:

```bash
yarn build
```

Then, start the server:

```bash
yarn start
```

The server will start at [http://localhost:3000](http://localhost:3000).

## Folder Structure

The folder structure is as follows:

```
frontend
├── actions             # Server actions
├── app
│   ├── api             # API routes
│   ├── login           # Login page
│   ├── register        # Register page
│   ├── verify          # Verify page
│   ├── error.tsx       # Error page
│   ├── layout.tsx      # Layout component
│   ├── loading.tsx     # Loading component
│   ├── not-found.tsx   # Not found page
│   └── page.tsx        # Page component
├── src
│   ├── constants.ts    # Constants
│   ├── cookies.ts      # Cookies
│   └── date.ts         # Date functions
├── components          # Reusable components
├── assets              # Assets
├── context             # Contexts
├── public              # Public files
├── styles              # Styles
├── types               # Types
├── .env.example        # Environment variables example
├── .eslintrc.json      # ESLint configuration
├── .prettierignore     # Prettier ignore file
├── .prettierrc.mjs     # Prettier configuration
├── .yarnrc.yml         # Yarn configuration
├── middleware.ts       # Middleware file
├── next.config.mjs     # Next.js configuration
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── LICENSE             # License file
├── README.md           # Readme file
├── tsconfig.json       # Typescript configuration
├── environment.d.ts    # Environment types
├── package.json        # NPM package file
└── yarn.lock           # Yarn lock file
```

## Pages

-   `/` - Home page (Protected Tasks page) - Shows the list of tasks and allows users to filter them based on the task status
-   `/login` - Login page
-   `/register` - Register page
-   `/verify` - Email verification page
-   `/404` - Not found page

## License

Distributed under the MIT License. See `LICENSE` for more information.
