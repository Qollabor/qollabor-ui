import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import fakeData from './data.json';
import Details from '../details';

storiesOf('CaseModels/Detail', module)
  .add('With data', () =>
    (<div className="center-component">
      <Details
        onMount={action('mount')}
        data={fakeData}
        onRowClick={action('row-click')}
      />
    </div>))
  .add('Show feedback', () =>
    (<div className="center-component">
      <Details
        onMount={action('mount')}
        data={fakeData}
        showFeedbackForm={true}
        onRowClick={action('row-click')}
      />
    </div>));
