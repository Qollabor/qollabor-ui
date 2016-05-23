import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TitledBox from './index';

storiesOf('components/titled-box', module)
  .add('The box should show the content',
    () => (
      <div style={{ width: '300px', marginLeft: '100px' }}>
        <TitledBox
          title="This is a title"
          isFetching={false}
          error={null}
        >And add some content</TitledBox>
      </div>
    )
  )
  .add('The box should show the loader',
    () => (
      <div style={{ width: '300px', marginLeft: '100px' }}>
        <TitledBox
          title="This is a title"
          isFetching={true}
          error={null}
        >And add some content</TitledBox>
      </div>
    )
  )
  .add('The box should show the error',
    () => (
      <div style={{ width: '300px', marginLeft: '100px' }}>
        <TitledBox
          title="This is a title"
          isFetching={false}
          error={{ isError: true, message: 'There are some errors' }}
        >And add some content</TitledBox>
      </div>
    )
  );
