import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import registry from 'app-registry';
import helpers from '../../../../../helpers';
import fakeData from './data.json';
import List from '../list';

registry.register('helpers', helpers);

storiesOf('CaseModels/List', module)
  .addDecorator(getStory => <MuiThemeProvider muiTheme={getMuiTheme()}>{getStory()}</MuiThemeProvider>)
  .add('With empty data', () =>
    (<div className="center-component">
      <List
        isFetching={false}
        items={[]}
      />
    </div>))
  .add('With null data', () =>
    (<div className="center-component">
      <List
        isFetching={false}
        items={null}
      />
    </div>))
  .add('Error state', () => {
    const error = {
      message: 'Failed to fetch',
      isError: true
    };

    return (
      <div className="center-component">
        <List
          isFetching={false}
          items={null}
          error={error}
        />
      </div>
    );
  })
  .add('Loading', () =>
    (<div className="center-component">
      <List
        isFetching={true}
        items={[]}
      />
    </div>))
  .add('After Loading', () =>
    (<div className="center-component">
      <List
        isFetching={false}
        items={fakeData.items}
      />
    </div>))
  .add('With Filter', () =>
    (<div className="center-component">
      <List
        isFetching={false}
        items={fakeData.items}
        filterString={'besluit'}
      />
    </div>));
