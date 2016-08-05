import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { CMMNIcon } from '../../cmmn-icons';

storiesOf('CMMN Icon', module)
  .add('With description', () =>
    (<div className="center-component">
      <CMMNIcon
        backgroundColor={'gray'}
        itemName={'HumanTask'}
        showDescription={true}
        style={{ color: 'white' }}
      />
    </div>))
  .add('Without description', () =>
    (<div className="center-component">
      <CMMNIcon
        backgroundColor={'gray'}
        itemName={'Milestone'}
        style={{ color: 'white' }}
      />
    </div>))
   .add('With description, no background', () =>
    (<div className="center-component">
      <CMMNIcon
        backgroundColor={'white'}
        itemName={'ProcessTask'}
        style={{ color: 'gray' }}
      />
    </div>))
   .add('With description, no background, large font', () =>
    (<div className="center-component">
      <CMMNIcon
        backgroundColor={'white'}
        itemName={'ProcessTask'}
        style={{ color: 'gray', fontSize: 28 }}
      />
    </div>))
   .add('With description, with background, large font', () =>
    (<div className="center-component">
      <CMMNIcon
        backgroundColor={'lightgray'}
        itemName={'ProcessTask'}
        style={{ color: 'gray', fontSize: 24 }}
      />
    </div>));
