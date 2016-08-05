import React from 'react';
import { fetchCaseTeam } from './helpers';
import { CaseTeam } from '../../features/case/components/case-team';
import Immutable from 'immutable';

const divStyle = {
  padding: '14px 14px 14px 0px'
};

export class CaseTeamViewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      caseTeamUsers: this.props.caseTeamUsers,
      caseTeam: this.props.caseTeam
    };
  }

  componentWillMount() {
    this.fetchCaseTeamUserDetails(this.props.caseTeam);
  }

  componentWillReceiveProps(nextProps) {
    const existingCaseTeam = Immutable.fromJS(this.props.caseTeam);
    const newCaseTeam = Immutable.fromJS(nextProps.caseTeam);
    if (Immutable.is(existingCaseTeam, newCaseTeam) !== true) {
      this.fetchCaseTeamUserDetails(nextProps.caseTeam);
    }
  }

  fetchCaseTeamUserDetails(caseTeam) {
    if (!this.props.caseTeamUsers) {
      fetchCaseTeam(caseTeam).then(response => {
        const dataKey = '_2';
        this.setState({
          caseTeamUsers: response.body[dataKey]
        });
      });
    }
  }

  render() {
    const { caseTeamUsers } = this.state;
    return (
      <div style={divStyle}>
        <CaseTeam caseTeam={caseTeamUsers} isFetching={false} error={{}} />
      </div>
    );
  }
}

CaseTeamViewer.propTypes = {
  caseTeam: React.PropTypes.object.isRequired
};
