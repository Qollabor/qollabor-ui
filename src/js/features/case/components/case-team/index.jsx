import React from 'react';
import PropTypes from 'prop-types';
import PeopleList from '../../../../components/people-list';
import { TitledBox } from '../../../../qollabor-ui-elements';

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
  caseTeam: PropTypes.array,
  people: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired
};

export const CaseTeam = TitledBox(CaseTeamComponent);
CaseTeam.displayName = 'CaseTeam';

export default CaseTeam;
