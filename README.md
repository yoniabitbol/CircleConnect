<div align="center">

  <img src="./client/public/Brand Logo/officccccc.jpg" alt="logo" width="200" height="auto" />
  <h1>CircleConnect</h1>
  
  <p>
    Connect, Collaborate, and Grow Your Circle! 
  </p>
  
  
<!-- Badges -->
<!-- <p>
  <a href="https://github.com/yoniabitbol/CircleConnect/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/Louis3797/awesome-readme-template" alt="contributors" />
  </a>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/Louis3797/awesome-readme-template" alt="last update" />
  </a>
  <a href="https://github.com/Louis3797/awesome-readme-template/network/members">
    <img src="https://img.shields.io/github/forks/Louis3797/awesome-readme-template" alt="forks" />
  </a>
  <a href="https://github.com/Louis3797/awesome-readme-template/stargazers">
    <img src="https://img.shields.io/github/stars/Louis3797/awesome-readme-template" alt="stars" />
  </a>
  <a href="https://github.com/Louis3797/awesome-readme-template/issues/">
    <img src="https://img.shields.io/github/issues/Louis3797/awesome-readme-template" alt="open issues" />
  </a>
  <a href="https://github.com/Louis3797/awesome-readme-template/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/Louis3797/awesome-readme-template.svg" alt="license" />
  </a>
</p> -->
   
<!-- <h4>
    <a href="https://github.com/Louis3797/awesome-readme-template/">View Demo</a>
  <span> · </span>
    <a href="https://github.com/Louis3797/awesome-readme-template">Documentation</a>
  <span> · </span>
    <a href="https://github.com/Louis3797/awesome-readme-template/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/Louis3797/awesome-readme-template/issues/">Request Feature</a>
  </h4> -->
</div>

<br />

<!-- Table of Contents -->

# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  - [Screenshots](#camera-screenshots)
  - [Tech Stack](#space_invader-tech-stack)
  - [Features](#dart-features)
  - [Environment Variables](#key-environment-variables)
- [Getting Started](#toolbox-getting-started)
- [Contact](#handshake-contact)

<!-- About the Project -->

## :star2: About the Project

<!-- Screenshots -->

### :camera: Screenshots

<div align="center"> 
  <img src="https://user-images.githubusercontent.com/91300383/212593657-21f3cb91-9dbe-4f1e-8f0f-881aaedbaa4d.png" alt="screenshot" />
  <p align="justify">CircleConnect is a professional networking platform that aims to connect professionals and businesses from all industries. Similar to LinkedIn, CircleConnect allows users to create and share professional profiles, connect with other users, and share and view job listings. With its user-friendly interface, CircleConnect makes it easy for professionals to connect with others in their industry and expand their professional network. Whether you're looking for a new job opportunity, seeking to connect with other professionals in your field, or looking to expand your business, CircleConnect provides the tools you need to succeed.
  </p>
</div>

<!-- TechStack -->

### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://tailwindcss.com/">TailwindCSS</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://expressjs.com/">Express.js</a></li>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>    
    <li><a href="https://firebase.google.com/">Firebase</a></li>
  </ul>
</details>

<details>
<summary>DevOps</summary>
  <ul>
    <li><a href="https://www.docker.com/">Docker</a></li>
    <li><a href="https://jestjs.io/">Jest</a></li>
    <li><a href="https://www.npmjs.com/package/supertest">SuperTest</a></li>
  </ul>
</details>

<!-- Env Variables -->

### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

| .env              | client/.env                   |
| ----------------- | ----------------------------- |
| `DEV_CLIENT_PORT` | `REACT_APP_FB_APIKEY`         |
| `DEV_SERVER_PORT` | `REACT_APP_FB_AUTH_DOMAIN`    |
| `DB`              | `REACT_APP_FB_PROJECT_ID`     |
| `FIREBASE_SA`     | `REACT_APP_FB_STORAGE_BUCKET` |
|                   | `REACT_APP_FB_MSGID`          |
|                   | `REACT_APP_FB_APPID`          |
|                   | `REACT_APP_FB_MEASUREMENTID`  |
|                   | `REACT_APP_BACKEND_PORT`      |

<!-- Getting Started -->

## :toolbox: Getting Started

Clone the project

```bash
 https://github.com/yoniabitbol/CircleConnect.git
```

Go to the project directory

```bash
  cd CircleConnect
```

Install dependencies

```bash
  cd client
  npm install
  docker build . -t client-dev
  cd ../server
  npm install
  docker build . -t server-dev
```

Start the app by using Docker in the root

```bash
  cd ../
  docker compose -f docker-compose-dev.yml up
```

<!-- Contact -->

## :handshake: Contact

| Name             | ID       | GitHub                              |
| ---------------- | -------- | ----------------------------------- |
| Adir Ben-David   | 40190551 | https://github.com/beezzyy          |
| Jonathan Abitbol | 40190550 | https://github.com/yoniabitbol      |
| Reuven Ostrofsky | 40188881 | https://github.com/Reuven1203       |
| Ankita Ingle     | 40120124 | https://github.com/ingleankita      |
| Evan Greenstein  | 40173229 | https://github.com/EvanGreener      |
| Matteo Mazzone   | 40174614 | https://github.com/mattmazzone      |
| William Wells    | 40111253 | https://github.com/RealWilliamWells |
| Luca Dallaire    | 40132255 |                                     |
