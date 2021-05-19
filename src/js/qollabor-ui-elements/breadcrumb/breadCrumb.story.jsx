import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Breadcrumb from './index';

const breadCrumbItems = [
  {
    label: 'My tasks',
    url: '#/tasks'
  },
  {
    label: 'current task',
    url: '#/tasks/curtask'
  },
  {
    label: 'last task'
  }
];

const breadCrumbItem = [
  {
    label: 'My tasks',
    url: '#/tasks'
  }
];

const breadCrumbEmpty = [];

storiesOf('components/breadcrumb', module)
  .add('The breadcrumb should show the crumbs',
    () => (
      <div style={{ width: '300px', marginLeft: '100px' }}>
        <Breadcrumb
          items={breadCrumbItems}
        />
      </div>
    ))
  .add('The breadcrumb should show different separator',
    () => (
      <div style={{ width: '300px', marginLeft: '100px' }}>
        <Breadcrumb
          items={breadCrumbItems}
          separator={'/'}
        />
      </div>
    ))
  .add('The breadcrumb should show one crumb',
    () => (
      <div style={{ width: '300px', marginLeft: '100px' }}>
        <Breadcrumb
          items={breadCrumbItem}
          separator={'>'}
        />
      </div>
    ))
  .add('The breadcrumb should show a message when no crumbs found',
    () => (
      <div style={{ width: '300px', marginLeft: '100px' }}>
        <Breadcrumb
          items={breadCrumbEmpty}
          separator={'>'}
        />
      </div>
    ));
