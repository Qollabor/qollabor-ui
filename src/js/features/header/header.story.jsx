import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Header } from './header';

storiesOf('Header', module)
  .addDecorator(getStory => <MuiThemeProvider muiTheme={getMuiTheme()}>{getStory()}</MuiThemeProvider>)
  .add('With a sample category', () => {
    const store = createStore(state => state);
    return (
      <Provider store={store}>
        <Header store={store} menuItemCategory="SomeCategory" />
      </Provider>
    );
  })
  .add('without a category', () => {
    const store = createStore(state => state);
    return (
      <Provider store={store}>
        <Header store={store} />
      </Provider>
    );
  });
