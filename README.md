# Tax-calculator assignment

This repo contains the solution to the tax calculator developer assignment by Points as shown [here](https://github.com/Points/developer-assignment-instructions/tree/master/tax-calculator)

The goal is to build an income tax calculator to help illustrate how marginal taxes work, which lets Canadian users submit their annual gross income to see how much they would owe in federal income tax for the year 2019.

This assignment was completed using the aid of [create-react-app](https://github.com/facebook/create-react-app), built with React, and the unit tests written with Jest and Enzyme.

## Notes

As directed, the app was built with the following constraints:
* The tax amounts were calculated using [Canadian federal income tax rates](https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-years.html#federal) for 2019.
* The web application includes two pages/screen:
  * The first screen displays a form, which accepts the user's gross salary for submission.
  * The second screen displays a breakdown of tax rates and amounts for each applicable tax bracket,
  as well as the total tax amount and effective tax rate.

## Instructions

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section in Create React App about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
