import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Header from './component';

storiesOf('Header', module)
  .add('With a sample category', () => (
    <Header menuItemCategory="SomeCategory" />
  ))
  .add('without a category', () => (
    <Header />
  ));
