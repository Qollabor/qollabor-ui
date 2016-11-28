import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TitledBox from './index';

class SampleComponent extends React.Component {
  render() {
    return <div>And add some content</div>;
  }
}

storiesOf('components/titled-box', module)
  .add('The box should show the content',
    () => {
      const MyElement = TitledBox(SampleComponent);
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
      const MyElement = TitledBox(SampleComponent);
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
      const MyElement = TitledBox(SampleComponent);
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
