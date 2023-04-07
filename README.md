# Job Flow

[![LICENSE](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
![Swagger Validator](https://img.shields.io/swagger/valid/3.0?specUrl=https%3A%2F%2Fraw.githubusercontent.com%2FOmolara5861%2FJobFlow%2Fmaster%2Fserver%2Fswagger.yml%3Ftoken%3DGHSAT0AAAAAAB4CCVI7DHMT57PIBPMSQQWIZBQMXAA&style=flat-square)

## Introduction
Job Flow is a web-based application that allows users to manage their job applications. The application provides a simple and intuitive interface for users to create, view, and update job listings. Users can add important details such as the job title, company name, and application deadline. The application also includes features for scheduling interviews and tracking the status of each application.

Job Flow is built with the MERN (MongoDB, Express, React, and Node.js) stack, which makes it a robust and scalable application. The frontend is designed with React, which provides a responsive and fast user interface. The backend is built with Node.js and Express, which makes it easy to develop and maintain a scalable server-side application. MongoDB is used for data storage, which provides flexibility and scalability for handling large amounts of data.

Job Flow also includes a comprehensive [API documentation](), using Swagger. This allows users to easily understand how the application works and how to interact with it programmatically. With Job Flow, users can easily manage their job applications and streamline their job search process.


## Table of contents
- [Job Flow](#job-flow)
  - [Introduction](#introduction)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Running the Frontend](#running-the-frontend)
    - [Running the Backend](#running-the-backend)
  - [Technologies](#technologies)
  - [Contributing](#contributing)
  - [License](#license)

<!-- ## Preview

![The landing page]( "Project Landing page")


[View Project]( "Live link") -->

## Installation
To install and run this project, you will need to have the following software installed on your computer:

- Node.js

Once you have the required software installed, follow these steps to get started:

1. Clone the repository on your local machine using the following command:

```
git clone https://github.com/Omolara5861/JobFlow.git
```
2. Navigate to the project directory using the following command:

```bash
  cd JobFlow
```

3. Navigate to the frontend directory and install the necessary dependencies using the following command:

```bash
  cd client && npm i
```

4. Go back one directory by running the following command:
```bash
cd ..
```

4. Navigate to the backend directory and install the necessary dependencies using the following command:

```bash
cd server && npm i
```

## Usage
### Running the Frontend

To start the frontend, run the following command in the client directory:
```bash
npm start
```
This will start the frontend on `http://localhost:3000/`.

### Running the Backend

To start the backend, navigate to the server folder and run the following command:
```bash
npm start
```
This will start the backend on `http://localhost:4002/`.

Once the application is up and running, you can use it to manage your job applications. You can create, edit, and delete job listings.

Job Flow comes with a comprehensive API documentation, using Swagger. You can access the API documentation by navigating to `http://localhost:4002/api-docs` in your web browser.

## Technologies
This project was built with ![Visual Studio](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) using:
* __Frontend__<br/>
![REACT BADGE](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![STYLED-COMPONENTS BADGE](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![REACT ROUTER BADGE](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Netlify Badge](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

* __Backend__<br/>
        ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
        ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
        ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
        ![Render BADGE](https://img.shields.io/badge/Render-FF69B4?style=for-the-badge&logo=render&logoColor=white)

- **Database** & **Documentation**<br />
        ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
        ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

## Contributing
If you'd like to contribute to Job Flow, please follow these steps:

- Fork this repository to your own GitHub account.
- Clone the forked repository to your local machine.
- Create a new branch for your changes.
- Make your changes and test them thoroughly
- Commit your changes and push them to your forked repository.
- Submit a pull request to the original repository.

## License
This project is licensed under the
[MIT license](https://opensource.org/licenses/MIT).
Please see the [LICENSE file](LICENSE.md) for more information.

> You can do whatever you want as long as you include the original copyright and
> license notice in any copy of the project/source.


*Copyright (c) 2023 Laradev. All right reserved.*