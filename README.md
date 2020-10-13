![](/design/UI/eatwell-mock-up-header.jpg)

# EatWell Calorie tracking app

A Full Stack Calorie counting and food tracking app with user login and authentication.

## User Story

I want somewhere to track food intake for the day by creating, editing food entries and tracking calories, and tracking my weight/BMI

### Acceptance Criteria

User should be able to:

- Create an account
- Log in using credentials
- Add a food entry including calories
- Edit and delete a food entry.
- See total calories for each meal of day.
- User can search for food from database of food.
- Enter Height and weight
- See progress of weight entries and BMI on graph.

## Design

### Wireframes

![](/design/wireframe/wireframes-1.png)

![](/design/wireframe/wireframes-2.png)

### UI Design

![](/design/UI/UI-design-01.png)

![](/design/UI/UI-design-02.png)

## Technologies Used

- HTML: Although the project was created using React, it used JSX which follows the structure and functionality of HTML.
- Javascript: Vanilla Javascript used for most of the front end logic
- React: Used to build the UI
- React Router: UI Routing
- Axios: HTTP Requests
- Material-UI: Used some Icons from material UI
- Node & Express: server and routing created using express
- Styled Components: Main styling of site utilizing styled Components for creating reusable components
- Edamam API: Food database for finding food rather than entering your own
- Bcrypt: used for pasword hashing
- JSON WebToken: Token created for checking whether user is logged in
- Mongoose: Used for MongoDB Schemas and fetching data from database

## Approach Taken

- Constructed wireframes for layout of the mobile and desktop site.
- Designed the UI of the app.
- Chose a third party API for finding food data.
- Set up the github repo and project board with a list of steps to completion.
- Created the server, database and back end.
- Created basic functioning front end without styling including authentication and user details.
- Styled front end to match initial design.

## Installation Instructions

1. Clone Project from repository
2. Run `npm install` in root directory to install all dependancies in the package.json files
3. Create a .env file in the server folder with a token and MongoDB database/collection path.
4. Run `npx nodemon server` in the server folder to run the server locally.
5. Run `npm start` in the client folder to run the front end

#### Dependancies

##### Front End

    "@material-ui/core": "^4.11.0",
    "@material-ui/icons": "^4.9.1",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "axios": "^0.20.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-router": "^5.2.0",
    "react-router-dom": "^5.2.0",
    "react-scripts": "3.4.3",
    "styled-components": "^5.2.0"

##### Server/Back end

    "bcrypt": "^5.0.0",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.10.5"

## Issues / Next-Steps

- Refactor DailyDiary code
- Add Edamam API food search functionality
- Display user BMI and weight details with graph.
- Add datepicker feature with automatic date logging and day refresh.
