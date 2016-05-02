import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@kadira/storybook';

import Header from './component';

storiesOf('Header', module)
  .add('With a sample category', () => {
    const store = createStore((state) => state);
    return (
      <Provider store={store}>
        <Header store={store} menuItemCategory="SomeCategory" />
      </Provider>
    );
  })
  .add('without a category', () => {
    const store = createStore((state) => state);
    return (
      <Provider store={store}>
        <Header store={store} />
      </Provider>
    );
  });
