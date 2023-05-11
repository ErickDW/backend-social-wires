<h1 align="center">The Social Wires Backend</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository, at the end of the document you will find the information to download and run it locally.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

-  Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
-  Website - [https://nestjs.com](https://nestjs.com/)
-  Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## This project documentation

Example of use and documentation made with the help of Swagger [read more here](https://backend-social-wires.vercel.app/docs) or download this project install the dependencies and access the documentation from [localhost:port/docs](http://localhost:3000/docs).

## Run the project in localhost

First remember to run the command that installs the dependencies.

```bash
$ npm install || $ npm i
```

afterwards you must create the or the file with the environment variables, as a good practice these files should not be uploaded to a repository, but with a sense of learning the environment variables files are found in the Plus folder of this repository, you can copy them and paste them in the main section (the general folder of the project, in the same position of this readme) or you can create them with the following variables for example.

```bash
DATABASE_NAME = my_db
DATABASE_PORT = 1000
API_KEY = 'ABC123'
PORT = 3000
JWT_SECRET = 'SocialWiRes'

MONGO_INITDB_ROOT_USERNAME = mongo
MONGO_INITDB_ROOT_PASSWORD = secret
MONGO_DB = social-wires
MONGO_HOST = localhost:27017
MONGO_CONNECTION = mongodb
```

excellent, we are almost done, now to use the database in the case of this project made in MongoDB, you must upload the docker, remember that in addition to having docker installed, it must also be active, (as an extra recommendation you can download the extension for .yml files to better appreciate the format inside the docker-compose.yml [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)).

ok once you are sure you have the docker ready, this command.

```bash
# The -d is for it to run in the background
$ docker-compose up -d mongo

#-----------------------

# This command is to see if there is a docker up
$ docker-compose ps

# This command is to stop the docker process
$ docker-compose down
```

perfect now for convenience to be able to connect to the database we can use Mongo Compass and thus have a UI to manage it if you do not have it installed look for it in [MongoDB Compass Download (GUI)](https://www.mongodb.com/try/download/compass).

--------------------------
Change line 44 in main.ts 
```bash
$ origin: ['http://localhost:4200'],
```

Ready we have finished now we only have to execute the run command and we would have our back running locally.

```bash
# run local
$ npm run start:dev
```

## Notes
- This project serves as an example of a backend where users are created, information is connected and stored with MongoDB, a non-relational database, but within the project there is an example of a one-to-many relationship, an example of roles, and the use of a JWT for logging. and logout of users.

- In the plus folder you will find the envaromends files, a postman document and an insomnia document with the get, post, put and delete of the project.

- The project has a frontend section made with the Angular framework and you can see its repository here [Frontend Social Wires](https://github.com/ErickDW/frontend-social-wires)

-This backend project is deployed with [Vercel](https://vercel.com) in [Back host Social Wires](https://backend-social-wires.vercel.app) exposed for testing.

## Author
-  Kenpo Erickson Cataño Gil - [Kenpo](https://kenpo-v.web.app/)
