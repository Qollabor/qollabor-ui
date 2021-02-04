# Cafienne-UI

This is the prototype Cafienne-UI which serves as a front-end for the Cafienne case file engine.

Note: For authentication auth0 is used. This is not implemented the way it formally should.
Because this UI is only for demo purposes we just made it work.

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
 * serve       : Serve the development app on port 8080 (Set in the config server.port)
 * serve-mock  : Serve the development app on port 8080 (Set in the config server.port) connected to the mocked API
 * serve-mock-api  : Serve a mocked API on port 8081 (Set in the config mockServer.port)


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

To set Cafienne API endpoint url, set `CAFIENNE_API_URL` or do the following:

```
CAFIENNE_API_URL=http://0.0.0.0/ npm run build-production
```

Yes, that trailing slash is there for a reason.

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

### Logger
To log use the logger service provided instead of calling directly.
Calling the console log directly from the code is forbidden by a rule in eslint.
Is possible to use it in the development process but all the `console.log` should be removed before the commit.

The logger is initialized in the `app.jsx` and registered in the registry.

```
import logger from './services/logger';
...
logger.setLevel(6); // the log level is taken from the config file
registry.register('logger', logger);

```

The log levels are the following:

 * emerg: 0
 * alert: 1
 * crit: 2
 * error: 3
 * warning: 4
 * notice: 5
 * info: 6 // The default value
 * debug: 7

Tu use the logger in the code get it from the registry:

```
registry.get('logger').emerg('Some emerg message');
registry.get('logger').alert('Some alert message');
registry.get('logger').crit('Some crit message');
registry.get('logger').error('Some error message');
registry.get('logger').warning('Some warning message');
registry.get('logger').notice('Some notice message');
registry.get('logger').info('Some info message');
registry.get('logger').debug('Some debug message');
```

### Notifier
The system provide a way to notify the user using a toaster.

There are 4 types of notifies:
 * notifyInfo
 * notifySuccess
 * notifyDanger
 * notifyWarning

The method takes 2 params:
 * message
 * dismissAfter (in milliseconds, default 3000)

```javascript
import { notifyInfo, notifySuccess, notifyDanger, notifyWarning } from 'path-to/notifier';


dispatch(notifyInfo('Hey Ho!!'));
dispatch(notifySuccess('And the winner is?', 5000));
dispatch(notifyWarning('Attention please!'));
dispatch(notifyDanger('Something went wrong.'));
```
