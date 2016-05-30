# Cafienne-UI Style guide

*A style guide about code organisation.*

## Introduction
This style guide describes how to organize your code.<br/>
If you are interested in our syntax styling we refer you to the [AirBNB Eslint](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) configuration.

### How to setup a new page?
We distinguish pages from component features. If you need a new page, you define a new page in:`src/js/pages/<new-page>.jsx`.<br/>
Within these pages you could import component features.

### How to setup a new feature?
Put a new feature in; `src/js/features/<new-feature>`.
If you build a feature that should be shared with other codebases put these in `src/js/components/<new-feature>`.<br/>

#### 1 component
With only 1 component you __could__ have the following files.<br/>
The files with a * in front of the name are optional files.

```sh
src/js/features/<new-feature>/
  index.js
  *component.story.jsx
  test/component.spec.js
  *component.jsx
  *reducers.js
  *styles.js
  *sagas.js
  *test/sagas.js
  *test/reducers.js
```

The importance lies in the word 'could' because we have all kind of variations.<br/>

__index.js__<br/>
You *always* create the `index.js` file in the first place.
There are two different implementations of this file:

v1.) This file contains the React component without any redux state reference.<br/>

v2.) When the React component needs state, the `index.js` will be responsible for mapping the state variables to properties in our React component. The React component itself is placed in a new file called `component.jsx`.

__component.story.jsx__<br/>
You only create a story in Storybook for a component if the component will be rendered.

__test/component.spec.js__<br/>
You should *always* create a unit-test for a component. Even when you only have references to other components, you could test if  these components are called correctly.

__component.jsx__<br/>
This files doesn't exist when the component is in `index.js`.
When you need a redux state in your component, the component will be moved to `component.jsx` and the state management is done in `index.js`.

__reducers.js__<br/>
Put the reducers and default state for a particular component in this file.

__styles.js__<br/>
Put your inline-style definition in this file.<br/>
When an element only has one style definition you can put the property directly in `style={{ color: 'red' }}`.

__sagas.js__<br/>
Put the sagas which belong to the component in this file.

__test/sagas.js__<br/>
unit-test of the sagas.

__test/reducers.js__<br/>
unit-test of the reducers.

#### Multiple components
If a component has sub-components create a new directory:
```sh
src/js/features/<new-feature>/components
```
In this directory the same rules apply as the 1 component description.

### How to use export?
You could export your component by default:

`export default <NameOfComponent />`

### When should I introduce a High Order Component?
### How to handle multiple reducers in the same feature?
### When should I introduce a sub-component in the ./components map?
### What to put in the ./helpers directory?
### What is a dumb component, aka functional component?
### What is a smart component, aka container component?
### Naming of directories and files
### How to test reducers?
### How to test sagas?
### How to use ImmutableJS?
### In which case should I use the router?
### In which case should I update the state?
### How to make a proper API integration?
