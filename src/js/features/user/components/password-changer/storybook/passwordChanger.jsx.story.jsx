import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { PasswordChanger } from '../index';

storiesOf('User/PasswordChanger', module)
  .add('Should show the password change form', () => (
    <div className="center-component">
      <PasswordChanger
        open={true}
        onRequestClose={action('onRequestClose')}
      />
    </div>
  ));
