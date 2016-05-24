import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TitledBox from './index';

storiesOf('components/titled-box', module)
  .add('The box should show the content',
    () => {
      const MyElement = TitledBox(() => <div>And add some content</div>);
      return (
        <div style={{ width: '300px', marginLeft: '100px' }}>
          <MyElement
            title="This is a title"
            isFetching={false}
            error={null}
          />
        </div>
      );
    }
  )
  .add('The box should show the loader',
    () => {
      const MyElement = TitledBox(() => <div>And add some content</div>);
      return (
        <div style={{ width: '300px', marginLeft: '100px' }}>
          <MyElement
            title="This is a title"
            isFetching={true}
            error={null}
          />
        </div>
      );
    }
  )
  .add('The box should show the error',
    () => {
      const MyElement = TitledBox(() => <div>And add some content</div>);
      return (
        <div style={{ width: '300px', marginLeft: '100px' }}>
          <MyElement
            title="This is a title"
            isFetching={false}
            error={{ isError: true, message: 'There are some errors' }}
          />
        </div>
      );
    }
  );
