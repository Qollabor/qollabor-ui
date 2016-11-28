import React from 'react';
import PeopleList from '../../../../components/people-list';
import { TitledBox } from '../../../../cafienne-ui-elements';

const style = { height: '30px' };

class CaseTeamComponent extends React.Component {
  render() {
    return (
      <div style={style}>
        <PeopleList maxPeopleInList={4} people={this.props.caseTeam ? this.props.caseTeam : []} />
      </div>
    );
  }
}

CaseTeamComponent.propTypes = {
  people: React.PropTypes.array,
  isFetching: React.PropTypes.bool.isRequired,
  error: React.PropTypes.object.isRequired
};

export const CaseTeam = TitledBox(CaseTeamComponent);
CaseTeam.displayName = 'CaseTeam';

export default CaseTeam;
