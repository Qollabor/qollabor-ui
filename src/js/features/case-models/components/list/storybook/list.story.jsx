import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import fakeData from './data.json';
import List from '../list';

storiesOf('CaseModels/List', module)
  .add('With empty data', () =>
    (<div className="center-component">
      <List
        onMount={action('mount')}
        isFetching={false}
        items={[]}
        onRowClick={action('row-click')}
      />
    </div>))
  .add('Loading', () =>
    (<div className="center-component">
      <List
        onMount={action('mount')}
        isFetching={true}
        items={[]}
        onRowClick={action('row-click')}
      />
    </div>))
  .add('After Loading', () =>
    (<div className="center-component">
      <List
        onMount={action('mount')}
        isFetching={false}
        items={fakeData.items}
        filterString={""}
        onRowClick={action('row-click')}
      />
    </div>))
  .add('With Filter', () =>
    (<div className="center-component">
      <List
        onMount={action('mount')}
        isFetching={false}
        items={fakeData.items}
        filterString={'besluit'}
        onRowClick={action('row-click')}
      />
    </div>));
