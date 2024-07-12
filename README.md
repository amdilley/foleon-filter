# Foleon Filter Application

This is a react front end that allows users to search through projects with optional search text and category filters.

## Design Decisions

For ease of setup this application was created with `create-react-app` and modified thereafter. This provides the desired React + TypeScript + Jest out of the box with minimal additional configuration required. I would not use this for a production facing application as many of the configuration settings are obfuscated and restricted. For the purposes of this exercise though this should suffice.

### API

The Foleon API credentials are specified in a local `.env` file. In a production application these values would be processed by a backend server so the credentials wouldn't be exposed to the client. Again, for the sake of simplicity this step was skipped in this exercise.

### Data Fetching

To fetch and process the data from Foleon API, I decided to use the `swr` [library](https://swr.vercel.app/). From their documentation:

> The name “SWR” is derived from stale-while-revalidate, a HTTP cache invalidation strategy popularized by [HTTP RFC 5861](https://tools.ietf.org/html/rfc5861). SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.

This library provides the simple, yet powerful `useSWR` react hook as well as some useful utility functions like `preload`. It is also agnostic of your fetching implementation which provides a lot of flexibility and customization.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
