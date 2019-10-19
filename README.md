# MyDairy
[![Build Status](https://travis-ci.org/irakozeyves1/MyDiary.svg?branch=develop)](https://travis-ci.org/irakozeyves1/MyDiary)
[![Coverage Status](https://coveralls.io/repos/github/irakozeyves1/MyDiary/badge.svg?branch=develop)](https://coveralls.io/github/irakozeyves1/MyDiary?branch=develop)

## Platform Description
MyDiary is an online journal where users can pen down their thoughts and feelings.
# Pivotal Tracker Story
- Check [Here](https://www.pivotaltracker.com/n/projects/2400478)
# UI Tools
- HTML5
- CSS3
- Javascript
# API Tools 
- node js
- Express js
- Javascript ES6
- Mocha
- Chai
- Airbnb
- Babel
- Eslint
- etc 
## Technology and Tools Stack
> - Uses `HTML` as the markup language for site structure and `CSS` for styling.
> - `ESlint` and `Babel` for code linting and transpiling respectively.
> - `Mocha` as a testing framework and `Chai` as an assertion library
> - The server side is built with `ExpressJS` which is a framework for building `Node.js` applications.
> - [NodeJS](https://nodejs.org/) - JavaScript Runtime Environment
> - [ExpressJs](https://expressjs.com/) - A Minimal  Web Application Framework
> - [Mocha](https://mochajs.org/) - JavaScript test framework
> - [Chai](http://www.chaijs.com/) - A BDD / TDD assertion library 

## Style guide
> - [Airbnb](https://github.com/airbnb/javascript) - Javascript style guide
## links for the UI
- github page for user [link here](https://irakozeyves1.github.io/MyDiary/UI)
## links for the Git Repo
- github Repo [link here](https://github.com/irakozeyves1/MyDiary)

## Required Features

- Users can create an account
- User can sign in 
- User can view all entries to their diary.
- Users can view the contents of a diary entry.
- Users can add entry
- Users can add or modify an entry.
- Users can delete an entry

## Additional Features

- Users can set and get daily notifications that prompt them to add an entry to their diary.
## API Endpoints

| Endpoint                    | Functionality        |
| --------------------------- | -------------------- |
| POST `/auth/signup`         | Register a user      |
| POST `/auth/signin`          | Login a user         |
| GET `/entries`              | Get all entries      |
| GET `/entries/:entryId`    | Get a single entry   |
| POST `/entries`             | Create an entry      |
| PATCH `/entries/:entryId`  | Modify an entry      |
| DELETE `/entries/:entryId` | Delete an entry      |

# Getting Started for backend

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See Installation, Running and deployment for more details. This Application is built in nodejs with es6.
## Prerequisites
MyDiary is built in node js with ES6 format. to get up the application running you need to install the following:
```
download the latest version of node js
```
## Installing
You have to follow the follow this procedure to get started.
Curretly data are being stored as json file but hopefully I will use postgresql database for persistence data.
got to the Version control and clone down the application
```
git clone https://github.com/irakozeyves1/MyDiary
```
```
To install all required dependecy ```run npm install```
```
the server will automatically install all the needed packages in the application
```
You need a testing environment like POSTMAN
```
For getting data from the app you will have to access every single API endpoint
like  localhost:3000/api/v1/
## To run The project
For nodemon use ```npm run dev```
For node use ```npm start```

## To Run test
use ```npm test```

## Built With Java script
Node/Express
## Acknowledgements
- Andela Homestudy : https://homestudy.andela.com

### Key Contributor
IRAKOZE Yves
### LICENSE
ISC License
Copyright (c) 2019 ```Yves IRAKOZE```
Open source software