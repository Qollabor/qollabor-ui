import React from 'react';
import { storiesOf } from '@kadira/storybook';

import AuthVerify from './authVerify.jsx';

storiesOf('Login/AuthVerify', module)
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
