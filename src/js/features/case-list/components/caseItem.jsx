import React from 'react';
import PropTypes from 'prop-types';
import { ActionAssignment } from 'material-ui/svg-icons';
import { blue500 } from 'material-ui/styles/colors';
import { ListItem } from 'material-ui';
import CaseHeaderDetails from '../../case/components/case-detail/components/case-document/caseHeaderDetails';

class CaseItem extends React.Component {
  constructor(props) {
    super(props);

    this.openCaseDetailPage = this.openCaseDetailPage.bind(this);
  }

  openCaseDetailPage () {
    const caseId = this.props.item.id;
    this.context.router.push(`/cases/${caseId}`);
  }
  render () {
    const { item, team, userDetails, caseTeamUsers } = this.props;
    return (
      <ListItem
        key={this.props.item.id}
        primaryText={item.name}
        leftIcon={<ActionAssignment color={blue500} style={{ top: '23px' }} />}
        onTouchTap={this.openCaseDetailPage}
        style={{ padding: '0px' }}
        secondaryText={
          <CaseHeaderDetails
            status={item.status} lastModified={item.lastModified}
            user={item.user} team={team} userDetails={userDetails}
            lastModifiedBy={item.lastModifiedBy} caseTeamUsers={caseTeamUsers}
          />
        }
      />
    );
  }
}

CaseItem.propTypes = {
  item: PropTypes.object.isRequired,
  team: PropTypes.array.isRequired,
  userDetails: PropTypes.object,
  caseTeamUsers: PropTypes.array
};
CaseItem.contextTypes = {
  router: PropTypes.object.isRequired
};

export default CaseItem;
