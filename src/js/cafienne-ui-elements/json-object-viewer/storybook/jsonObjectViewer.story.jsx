import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Paper } from 'material-ui';
import { JsonObjectViewer } from '../index';
import { JsonPrinter } from '../jsonPrinter';

const paperStyle = { padding: '5px', width: '300px' };

const longJson = {
  definition: 'TravelRequest',
  rootCaseId: 'd62dea32_62b8_4206_b12e_029436d75001',
  id: 'd62dea32_62b8_4206_b12e_029436d75001',
  plan: {
    items: [
      {
        isRequired: false,
        isRepeating: false,
        caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
        name: 'TravelRequest',
        id: 'f6518fcc_be0d_4e51_ac38_7cdd4270f8fd',
        historyState: 'Null',
        transition: 'Create',
        stageId: null
      },
      {
        isRequired: false,
        isRepeating: false,
        caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
        name: 'TravelRequest',
        id: 'f6518fcc_be0d_4e51_ac38_7cdd4270f8fd',
        historyState: 'Null',
        transition: 'Create',
        stageId: null
      },
      {
        isRequired: false,
        isRepeating: false,
        caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
        name: 'TravelRequest',
        id: 'f6518fcc_be0d_4e51_ac38_7cdd4270f8fd',
        historyState: 'Null',
        transition: 'Create',
        stageId: null
      }
    ]
  }
};

storiesOf('JsonObjectViewer', module)
  .addDecorator((getStory) => <MuiThemeProvider muiTheme={getMuiTheme()}>{getStory()}</MuiThemeProvider>)
  .add('Button with short json', () => {
    const json = {
      definition: 'Social benefits application'
    };

    return (
      <div className="center-component">
        <Paper style={paperStyle}>
          <JsonObjectViewer
            object={json}
            buttonTitle="Open case short"
            buttonIsPrimary={true}
            modalTitle="This is a title"
          />
        </Paper>
      </div>
    );
  })
  .add('Button with long json', () => (
    <div className="center-component">
      <Paper style={paperStyle}>
        <JsonObjectViewer
          object={longJson}
          buttonTitle="Open case long"
          modalTitle="This is a title"
        />
      </Paper>
    </div>)
  )
  .add('View with short json', () => {
    const json = {
      definition: 'Social benefits application'
    };

    return (
      <div className="center-component">
        <Paper style={paperStyle}>
          <JsonPrinter object={json}/>
        </Paper>
      </div>
    );
  })
  .add('View with long json', () => (
    <div className="center-component">
      <Paper style={paperStyle}>
        <JsonPrinter object={longJson}/>
      </Paper>
    </div>)
  );
