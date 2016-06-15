import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import fakeData from './data.json';
import Details from '../details';

storiesOf('CaseModels/Detail', module)
  .addDecorator((getStory) => <MuiThemeProvider muiTheme={getMuiTheme()}>{getStory()}</MuiThemeProvider>)
  .add('With Empty data', () =>
    (<div className="center-component">
      <Details
        isFetching={false}
      />
    </div>))
  .add('Error state', () => {
    const error = {
      message: 'Failed to fetch',
      isError: true
    };

    return (
      <div className="center-component">
        <Details
          isFetching={false}
          data={null}
          error={error}
        />
      </div>
    );
  })
  .add('Loading', () =>
    (<div className="center-component">
      <Details
        isFetching={true}
      />
    </div>))
  .add('With data', () =>
    (<div className="center-component">
      <Details
        data={fakeData}
      />
    </div>))
  .add('Show feedback', () =>
    (<div className="center-component">
      <Details
        data={fakeData}
        showFeedbackForm={true}
      />
    </div>));
