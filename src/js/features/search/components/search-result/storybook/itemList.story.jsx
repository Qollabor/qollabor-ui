import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ItemList from '../itemList';
import fakeData from './data.json';

storiesOf('SearchResultView', module)
  .addDecorator((getStory) => <MuiThemeProvider muiTheme={getMuiTheme()}>{getStory()}</MuiThemeProvider>)
  .add('list of items returned on searching Request ', () =>
    (<div className="center-component">
      <ItemList items={fakeData} />
    </div>)
  );
