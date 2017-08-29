import React from 'react';
import PropTypes from 'prop-types';
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
      user, team, userDetails, caseTeamUsers, planItems } = this.props;
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
            caseTeamUsers={caseTeamUsers} planItems={planItems}
          />
        </CardMedia>
      </Card>
    );
  }
}
CaseHeader.propTypes = {
  caseTeamUsers: PropTypes.array,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  lastModified: PropTypes.string.isRequired,
  lastModifiedBy: PropTypes.string,
  planItems: PropTypes.array,
  user: PropTypes.string.isRequired,
  file: PropTypes.object.isRequired,
  team: PropTypes.array.isRequired,
  userDetails: PropTypes.object
};

export default CaseHeader;
