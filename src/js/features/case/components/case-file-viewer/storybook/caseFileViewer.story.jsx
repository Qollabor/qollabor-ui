import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { Paper } from 'material-ui';
import { CaseFileViewer } from '../index';

const paperStyle = { padding: '5px', width: '300px' };

storiesOf('Case/Viewer', module)
  .add('short json', () => {
    const json = {
      definition: 'Social benefits application'
    };

    return (
      <div className="center-component">
        <Paper style={paperStyle}>
          <CaseFileViewer case={json}/>
        </Paper>
      </div>
    );
  })
  .add('long json', () => {
    const json = {
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

    return (
      <div className="center-component">
        <Paper style={paperStyle}>
          <CaseFileViewer case={json}/>
        </Paper>
      </div>
    );
  });
