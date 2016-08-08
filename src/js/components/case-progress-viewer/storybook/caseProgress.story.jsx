import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { store } from '../../../store.js';
import CaseProgressViewer from '../';
import { Provider } from 'react-redux';
import submittedItems from './CaseSubmitted.json';
import approvedItems from './CaseApproved.json';
import pocreatedItems from './PurchaseOrderCreated.json';

storiesOf('Case Progress Viewer', module).addDecorator((story) => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>{story()}</MuiThemeProvider>
  </Provider>
  ))
  .add('Case Prgress for Request Submitted ', () =>
    (<div className="center-component">
      <CaseProgressViewer items={submittedItems}/>
    </div>)
).add('Request Approved', () =>
  (<div className="center-component">
    <CaseProgressViewer items={approvedItems}/>
  </div>)
).add('PO Created ', () =>
  (<div className="center-component">
    <CaseProgressViewer items={pocreatedItems}/>
  </div>)
);
