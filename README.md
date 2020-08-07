# JusticeText Full Stack Technical Assessment

Thank you so much for your interest in joining JusticeText. Please read the instructions below before you start the assessment.

To begin the assessment, you will need to download the associated files in this repo and ensure you have node installed on your machine. This repo contains code for a starter application that you will be improving as part of this assessment. The server file is written in Node.js and the frontend utilizies React.js.

## Install Node

Follow the instructions on the [Node.js official site](https://nodejs.org/en/download/) to download Node.js and NPM. We use yarn as our package manager and if you wish to do the same, you can follow the instructions on the [Yarn official site](https://classic.yarnpkg.com/en/docs/install) to install it.

## Clone or download this repo

Get the starter code for this assessment on your machine by cloning or downloading the contents of this repository. From there, if you are using yarn, you can run the following command to load the dependencies you need to run the starter application. Run the following command for both the server and the client.

### `yarn install`
  
## Starting the application

Once you have all of the dependencies loaded, you can run both the server and frontend simultaneously by running:

### `yarn dev`

Alternatively, you may run the server and the front end independently. The frontend will fail to fetch its data if the backend is not running. You can use the following command to run just the server before you run the frontend:

### `yarn server`

The frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can use the following commands in the client directory.
The server runs at [http://localhost:8080](http://localhost:8080)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
