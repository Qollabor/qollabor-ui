import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf, action } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import registry from 'app-registry';
import { Header } from './header';
import theme from '../../themes';
import { store } from '../../store';
import request from '../../services/request';
import logger from '../../services/logger';

registry.register('store', store);
registry.register('request', request);
registry.register('logger', logger);
registry.register('config', {});
registry.register('theme', theme);

storiesOf('Header', module)
  .addDecorator(getStory => (
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>{getStory()}</MuiThemeProvider>
    </Provider>
  ))
  .add('Show drawer is enabled', () => (
    <Header
      store={store}
      showDrawer={true}
    />
  ))
  .add('Show drawer is disabled', () => (
    <Header
      store={store}
      showDrawer={false}
    />
  ));
