import React from 'react';
import PropTypes from 'prop-types';
import registry from 'app-registry';
import { StatusCapsule } from '../../../../../../components/capsules';
import ItemTextField from '../../../../../search/components/search-result/itemTextField';
import { CaseTeamViewer } from '../../../../../../components/case-team-viewer/caseTeamViewer';
import { CaseUser } from './caseUser';
import CaseProgressViewer from '../../../../../../components/case-progress-viewer';

const flexContainer = {
  display: 'flex'
};

class CaseHeaderDetails extends React.Component {
  getLocalFormattedDate (date) {
    return registry.get('helpers').getLocalDateTime(date);
  }
  render () {
    const { status, lastModified, lastModifiedBy,
      team, userDetails, caseTeamUsers, planItems } = this.props;
    return (
      <div>
        <div style={flexContainer}>
          <div style={{ marginLeft: '5px', width: '180px' }}>
            <ItemTextField
              value={this.getLocalFormattedDate(lastModified)}
              name="Last Modified At"
              inputStyle={{ width: '180px' }}
              style={{ width: '180px' }}
            />
          </div>
          <div style={{ marginLeft: '5px', width: '180px' }}>
            <CaseUser userId={lastModifiedBy} userDetails={userDetails} label="Last Modified By" />
          </div>
          <div style={{ padding: '0px 20px 20px 0px' }}>
            <CaseTeamViewer caseTeam={team} caseTeamUsers={caseTeamUsers} />
          </div>
          <div style={{ padding: '20px 20px 20px 0px' }}>
            <StatusCapsule
              status={status}
            >{status}
            </StatusCapsule>
          </div>
        </div>
        <div style={{ padding: '0px 20px 20px 0px' }}>
          <CaseProgressViewer items={planItems} />
        </div>
      </div>
    );
  }
}

CaseHeaderDetails.propTypes = {
  caseTeamUsers: PropTypes.array,
  status: PropTypes.string,
  lastModified: PropTypes.string.isRequired,
  lastModifiedBy: PropTypes.string,
  userDetails: PropTypes.object,
  planItems: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.string.isRequired,
  team: PropTypes.array.isRequired
};

export default CaseHeaderDetails;
