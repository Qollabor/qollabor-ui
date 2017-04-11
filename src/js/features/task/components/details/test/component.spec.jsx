/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


describe('features/task/taskDetails', () => {
  beforeEach(() => {
    class ReactComponent extends React.Component {
      render () {
        return (<div />);
      }
    }

    jest.mock('../../../../../components/capsules', () => ({ StatusCapsule: ReactComponent }));
    jest.mock('material-ui/RaisedButton', () => ReactComponent);
    jest.mock('material-ui/FlatButton', () => ReactComponent);
    jest.mock('../../breadcrumb', () => ({ TaskBreadcrumb: ReactComponent }));
    jest.mock('../../schema-form', () => ({ formData }) => (<div formData={formData} />));
    jest.mock('../../../components/action-buttons', () => ({ ActionButtons: ReactComponent }));
  });

  it('has correct default options', () => {
    const TaskDetails = require('../taskDetails').default; // eslint-disable-line global-require

    const caseId = 'blah';
    const taskId = '123';
    const isFetching = false;
    const taskDetails = { assignee: 'wilbur', owner: 'admin' };
    const component = renderer.create(
      <MuiThemeProvider>
        <TaskDetails
          caseId={caseId}
          taskId={taskId}
          isFetching={isFetching}
          taskDetails={taskDetails}
        />
      </MuiThemeProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('implements raw output', () => {
    const TaskDetails = require('../taskDetails').default; // eslint-disable-line global-require

    const caseId = 'blah';
    const taskId = '123';
    const isFetching = false;
    const taskDetails = { assignee: 'wilbur', owner: 'admin', rawOutput: { raw: 'output' } };
    const component = renderer.create(
      <MuiThemeProvider>
        <TaskDetails
          caseId={caseId}
          taskId={taskId}
          isFetching={isFetching}
          taskDetails={taskDetails}
        />
      </MuiThemeProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('handles initTenantOrganisations prop', () => {
  //   const TenantOrganisations = require('../component').default; // eslint-disable-line global-require
  //
  //   const data = [];
  //   const initTenantOrganisations = () => {};
  //   const component = renderer.create(
  //     <MuiThemeProvider>
  //       <TenantOrganisations
  //         data={data}
  //         initTenantOrganisations={initTenantOrganisations}
  //       />
  //     </MuiThemeProvider>
  //   );
  //   const tenantOrganisationComponent = component.toJSON();
  //   expect(tenantOrganisationComponent).toMatchSnapshot();
  // });
});
