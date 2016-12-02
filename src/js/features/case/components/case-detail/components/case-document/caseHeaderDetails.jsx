import React from 'react';
import { StatusCapsule } from '../../../../../../components/capsules';
import ItemTextField from '../../../../../search/components/search-result/itemTextField';
import registry from 'app-registry';
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
      team, lastModifiedByUserDetails, caseTeamUsers, planItems } = this.props;
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
            <CaseUser userId={lastModifiedBy} userDetails={lastModifiedByUserDetails} label="Last Modified By" />
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
  status: React.PropTypes.string,
  lastModified: React.PropTypes.string.isRequired,
  user: React.PropTypes.string.isRequired,
  team: React.PropTypes.array.isRequired
};

export default CaseHeaderDetails;
