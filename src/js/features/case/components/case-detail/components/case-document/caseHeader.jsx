import React from 'react';
import { Card, CardHeader, CardMedia } from 'material-ui';
import registry from 'app-registry';
import CaseHeaderDetails from './caseHeaderDetails';

const headerStyle = {
  backgroundColor: 'rgb(232, 232, 232)'
};

class CaseHeader extends React.Component {
  getLocalFormattedDate (date) {
    return registry.get('helpers').getLocalDateTime(date);
  }
  render () {
    const { name, status, lastModified, lastModifiedBy,
      user, team, userDetails, lastModifiedByUserDetails, caseTeamUsers, planItems } = this.props;
    return (
      <Card style={{ margin: '10px' }} initiallyExpanded={true}>
        <CardHeader
          title={name}
          actAsExpander={false}
          showExpandableButton={false}
          style={headerStyle}
        />
        <CardMedia style={{ height: '130px', marginLeft: '16px' }}>
          <CaseHeaderDetails
            status={status} lastModified={lastModified} lastModifiedBy={lastModifiedBy}
            user={user} team={team} userDetails={userDetails}
            lastModifiedByUserDetails={lastModifiedByUserDetails}
            caseTeamUsers={caseTeamUsers} planItems={planItems}
          />
        </CardMedia>
      </Card>
    );
  }
}
CaseHeader.propTypes = {
  caseTeamUsers: React.PropTypes.array,
  name: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  lastModified: React.PropTypes.string.isRequired,
  lastModifiedBy: React.PropTypes.string,
  lastModifiedByUserDetails: React.PropTypes.object,
  planItems: React.PropTypes.array,
  user: React.PropTypes.string.isRequired,
  file: React.PropTypes.object.isRequired,
  team: React.PropTypes.array.isRequired,
  userDetails: React.PropTypes.object
};

export default CaseHeader;
