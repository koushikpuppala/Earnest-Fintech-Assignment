# Backend

This folder contains the server-side code for the application. It handles the business logic, database interactions, authentication, and other server-side operations.

## Table of Contents

-   [Installation](#installation)
-   [Configuration](#configuration)
-   [Running the Application](#running-the-application)
-   [Folder Structure](#folder-structure)
-   [API Endpoints](#api-endpoints)
-   [License](#license)

## Installation

Clone the repository:

```bash
git clone https://github.com/koushikpuppala/earnest-fintech-assignment.git
```

Navigate to the backend directory:

```bash
cd earnest-fintech-assignment/backend
```

To install the dependencies, run:

```bash
yarn install
```

## Configuration

Create a `.env` file in the root directory of the backend and fill the details as shown in the `.env.example` file.

## Running the Application

To start the server in development mode, run:

```bash
yarn dev
```

The server will start at [http://localhost:8080](http://localhost:8080).

To start the server in production mode, run:

First, build the application:

```bash
yarn build
```

Then, start the server:

```bash
yarn start
```

The server will start at [http://localhost:8080](http://localhost:8080).

## Folder Structure

The folder structure is as follows:

```
backend
├── prisma
│   ├── migrations      # Database migrations
│   └── schema.prisma   # Prisma schema
├── src
│   ├── constants       # Constants
│   ├── controllers     # Route controllers
│   ├── middleware      # Middlewares
│   ├── routes          # Routes
│   ├── services        # Business logic
│   ├── types           # Typescript types
│   └── index.ts        # Entry point
├── .env.example        # Environment variables example
├── .gitignore          # Git ignore file
├── .prettierignore     # Prettier ignore file
├── .prettierrc.mjs     # Prettier configuration
├── .yarnrc.yml         # Yarn configuration
├── API.md              # API documentation
├── LICENSE             # License file
├── README.md           # Readme file
├── tsconfig.json       # Typescript configuration
├── environment.d.ts    # Environment types
├── package.json        # NPM package file
└── yarn.lock           # Yarn lock file
```

## API Endpoints

The API endpoints are documented in the [API Documentation](API.md).

## License

Distributed under the MIT License. See `LICENSE` for more information.
