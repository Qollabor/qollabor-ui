import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AuthVerify from './authVerify.jsx';

storiesOf('Login/AuthVerify', module)
  .addDecorator((getStory) => <MuiThemeProvider muiTheme={getMuiTheme()}>{getStory()}</MuiThemeProvider>)
  .add('Should show the progress icon', () => (
    <div className="center-component">
      <AuthVerify isVerifyAuth={true}>
        <div>If you see this something went wrong</div>
      </AuthVerify>
    </div>
  ))
  .add('Should show the content', () => (
    <div>
      <AuthVerify isVerifyAuth={false}>
        <div>You should see this</div>
      </AuthVerify>
    </div>
  ));
