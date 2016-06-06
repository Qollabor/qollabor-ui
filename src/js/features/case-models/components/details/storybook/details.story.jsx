import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import fakeData from './data.json';
import Details from '../details';

storiesOf('CaseModels/Detail', module)
  .addDecorator((getStory) => <MuiThemeProvider muiTheme={getMuiTheme()}>{getStory()}</MuiThemeProvider>)
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
