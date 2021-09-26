# The Eficode practical assignment

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Having examined the tendency in the data changes, I believe it could be measurements of a longer-lasting phenomenon, whose values do not change drastically over short period time, and which can also report no data, as one of the sensors has reported null. If I were to put forward one particular guess, a [Snow gauge](https://en.wikipedia.org/wiki/Snow_gauge) would be one.

The project is split into two repositories - the api and the frontend, in order not to couple the code too much. The frontend is a vanilla React app deployed on Netlify, the backend an Express api deployed on Heroku.

The Heroku Dyno has a scheduler addon enabled, which runs a script every eight hours (I noticed the data does not actually change every hour), adding the result from your api in a MongoDB database. If you're wondering why the results amount does not match the aforementioned frequency, it is most likely due to the fact that the free Heroku Dyno sometimes simply rejects the request for the "one-off" Dyno which runs the script... (I also manually changed one of the results to simulate a bigger change in the data)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Please note that the site will not function properly without the appropriate environment variables.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
