# ease-store-server

EaseStore Server is a Node.js backend server service for EaseStore, providing merchandise and order management.

Developed with [NestJS](https://nestjs.com/), TypeORM and PostgreSQL.

OSS Service now only support Tencent Cloud COS.

FOR APP SOFTWARE AND SERVICE, PLEASE REFER TO [ease-store-app](https://github.com/MengLuoRJ/ease-store-app)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Setup Project

Edit config files depending on your requirements to setup the project.

- `.env`: Environment Variables, copy `.env.example` to `.env` and edit it based on the config files from `/src/config/*.config.ts`
  
**DO NOT USE THE SETTINGS IN THE FILE, CHANGE THEM TO YOUR OWN**

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```