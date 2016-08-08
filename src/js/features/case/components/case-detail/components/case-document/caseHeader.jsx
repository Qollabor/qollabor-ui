import React from 'react';
import { Card, CardHeader, CardMedia, CardActions } from 'material-ui';
import registry from 'app-registry';
import CaseFile from '../../../case-file';
import CaseHeaderDetails from './caseHeaderDetails';

const headerStyle = {
  backgroundColor: 'rgb(232, 232, 232)'
};

class CaseHeader extends React.Component {
  getLocalFormattedDate (date) {
    return registry.get('helpers').getLocalDateTime(date);
  }
  render () {
    const { name, status, lastModified, user, file, team, userDetails, caseTeamUsers, planItems } = this.props;
    return (
      <Card style={{ margin: '10px' }}>
        <CardHeader
          title={name}
          actAsExpander={false}
          showExpandableButton={false}
          initiallyExpanded={true}
          style={headerStyle}
        />
        <CardMedia style={{ height: '100px', marginLeft: '16px' }}>
          <CaseHeaderDetails
            status={status} lastModified={lastModified}
            user={user} team={team} userDetails={userDetails} caseTeamUsers={caseTeamUsers} planItems={planItems}
          />
        </CardMedia>
        {file &&
          <CardActions>
            <CaseFile file={file} />
          </CardActions>
        }
      </Card>
    );
  }
}
CaseHeader.propTypes = {
  name: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  lastModified: React.PropTypes.string.isRequired,
  user: React.PropTypes.string.isRequired,
  file: React.PropTypes.object.isRequired,
  team: React.PropTypes.object.isRequired
};

export default CaseHeader;
