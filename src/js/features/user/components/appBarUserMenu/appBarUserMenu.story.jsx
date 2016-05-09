import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { AppBarUserMenu } from './appBarUserMenu.jsx';

storiesOf('User/AppBarUserMenu', module)
  .add('Should show the menu icon', () => (
    <div
      className="center-component"
      style={{
        backgroundColor: 'rgb(0, 188, 212)',
        paddingLeft: 100
      }}
    >
      <AppBarUserMenu onLogout={action('logout')} />
    </div>
  ));
