# Cafienne-UI

This is the Cafienne-UI which serves as a front-end for the Cafienne case file engine.

The UI is built using:

 * react: https://facebook.github.io/react/
 * redux: https://github.com/reactjs/redux
 * redux-saga: https://github.com/yelouafi/redux-saga
 * react-router: https://github.com/reactjs/react-router
 * immutable: https://facebook.github.io/immutable-js
 
 
## Development/Local running

To start developing this UI you there are some prerequisites:

* node.js ~ 5.4.1
* npm ~ 3.3.12
* gulp @3.9.0

They all need to be installed globally (i.e. with `npm install -g`)

To develop/run the ui locally execute the following steps:

1. Install the prereqs mentioned above.
2. Check out the project from GitHub [cafienne-ui](https://github.com/cafienne/cafienne-ui.git)
3. Run `npm install`
4. To run the local server (in dev mode) run `npm run serve`

> For now the UI expects that the cafienne engine is running on localhost:18082


### Gulp tasks

 * build-src   : Build and bundle the javascript app
 * clean       : Clean the dist folder
 * copy-html   : Copy the html files in the dist folder
 * css         : Bundle and copy the css/scss files in the dist folder
 * eslint      : Check the JS syntax using eslint
 * mocha       : Run the unit test
 * serve       : Serve the development app on port 8080
 * serve-mock  : Serve the development app on port 8080 connected to the mocked API
 * serve-mock-api  : Serve a mocked API on port 8081


### Test

The application is tested using the following technologies:
 * mocha - https://mochajs.org
 * chai - http://chaijs.com
 * sinon - http://sinonjs.org
 * enzyme - http://airbnb.io/enzyme

to run the test:

```
npm test
```

##### Folder/file structure

The test should be added directly beside the file in a folder called 
`test` and with an extension in the format `filename.spec.js` 
or `filename.spec.jsx`  

```
.
├── app
│   └── js
│     ├── ...
│     ├── fileToTest.js
│     └── test
│       └── fileToTest.spec.js
├── ...
└── ...
```
 
### Development server
The development server is created using `webpack-dev-server` with 
the react hot reloader.

to run the server:

```
npm run serve
```

### Mock API server
A mocked version of the API is provided. The API mock server is locaten in the folder `tasks/common/server`.

to run the mock server:

```
npm run serve-mock-api
```

and connect the client running with:

```
npm run serve-mock
```
 
### Storybook
To develop component in an isolated environemnt the system use 
Storybook
https://github.com/kadirahq/react-storybook

to run the storybook platform:
```
npm run storybook
```

 
### Build production bundle 
To build the pruduction bundle run:
 
```
npm run build-production
```

## Folder/File structures

#### Project

```
.
├── config                // the application configuration
│   ├─- default.js        // https://github.com/lorenwest/node-config
│   ├─- ...
│   └── production.js
├── dist                  // The dist folder
├── src                   // The source folder
│   └── js                // The app javascript folder
│   │ └── ... 
│   ├─- index.html
│   └── styles.scss
├── tasks                 // The gulp tasks folder, https://github.com/sytac/gulp-commonjs-tasks
├── tests                 // The common test folder, integration test should be put here
│   └── helpers     
├── gulpfile.js
├── package.json
├── ...
└── README.md
```

#### JS app


```
src/js/
├── app.jsx                       // The app entry point
├── features                      // The folder containing the features
│   ├── header                    // A specific feature, if is simple keep the structure flat
│   │   ├── component.jsx         // The dumb react component
│   │   ├── header.story.jsx      // The storybook init file
│   │   ├── index.js              // The redux connector
│   │   └── styles.js             // The inline styles
│   ├── sample
│   │   ├── childComponent.jsx
│   │   ├── index.jsx
│   │   └── test
│   │       └── sample.spec.jsx
│   └── user
│       ├── components            // If the feature has a complex structure create a component folder
│       ├── index.js              // The entry point of the feature, should export the part of the feature 
│       ├── reducers.js
│       └── sagas.js
├── layouts                       // The folder containing the layouts 
│   └── mainLayout.jsx
├── pages                         // The App Pages realated to the router
│   ├── credits.jsx
│   ├── home.jsx
│   └── info.jsx
├── reducers                      // The app reducers
│   ├── app.js
│   ├── index.js
│   └── test
│       └── app.spec.js
├── routes.jsx                    // The route definition
├── sagas                         // The app saga
│   ├── index.js
│   ├── initAppFlow.js
│   └── test
│       └── initAppFlow.spec.js
├── services                      // The common services
└── store.js                      // The store init file
```
