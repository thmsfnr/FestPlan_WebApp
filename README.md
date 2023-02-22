# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).





## FestPlan_WebApp

<em>FestPlan_WebApp is a generic React web application to manage volunteers for every types of festival.</em>

<strong>Note that for each command present in this file, you have to be in the top directory of the project.</strong>

***

### API points

For each table in the database, the route is built on the following model:
- Get on `/api/tableName/:elem` to retrieve one or more rows of the table corresponding to this element
- Put on `/api/tableName/:id` to modify a row of the table corresponding to this id
- Post on `/api/tableName/` to create a new row
- Delete on `/api/tableName/:id` to delete a row in the table corresponding to this id

It is important to know that most routes can only be accessed by being an admin, that is, by providing a valid token.

***

### First launch 

To be done in the following order:
- If node is not installed run `make node`
- Run `make dependencies` to install the dependencies
- Set the mysql database access information in `config/db.config.js`
- Set the jwt secret in `config/auth.config.js`
- Set the firstExec variable to true in `server.js`
- Run `make run` to launch the application
- Set the firstExec variable to false in `server.js`

***

### Normal launch 

To launch the application you just have to run the following command: `make run`

***

## Created by Thomas and Loris.
