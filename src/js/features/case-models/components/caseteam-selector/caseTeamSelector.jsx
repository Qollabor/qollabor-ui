import React from 'react';
import { Subheader, Popover } from 'material-ui';
import AvatarList from '../../../../components/people-list/components/avatarList';
import UserSelector from '../../../../components/user-selector';

class CaseTeamSelector extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
      selectedRole: null
    };
  }

  componentWillMount() {
    if (this.props.initCaseTeam) {
      // Add empty role for assigning users without roles
      this.props.teamRoles.unshift({ name: '', description: '' });
      this.props.initCaseTeam(this.props.teamRoles);
    }
  }

  handleUserSelectChange(user, selected) {
    const selectedRole = this.state.selectedRole;
    this.props.setUsersForCaseTeamRoles(selectedRole, user, selected);
  }

  handleRequestOpen(roleName, event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
      selectedRole: roleName
    });
  }

  requestRequestClose() {
    this.setState({
      open: false,
      anchorEl: null,
      selectedRole: null
    });
  }


  render() {
    const roleObj = this.props.roles;
    const roles = this.props.teamRoles;
    return (
      <div>
        <div style={{ height: 350 }}>
          {roles.map(role => (
            <div key={role.name} style={{ height: 80, marginLeft: 15 }}>
              <Subheader style={{ height: 20, paddingLeft: 0, lineHeight: 1 }}>{role.description}</Subheader>
              <AvatarList
                maxPeopleInList={10}
                people={roleObj[role.name]}
                maxLength={300}
                onShowMoreAction={this.handleRequestOpen.bind(this, role.name)}
              />
            </div>
          ))}
        </div>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.requestRequestClose.bind(this)}
          bodyStyle={{ paddingTop: '10px', paddingBottom: '30px' }}
        >
          <UserSelector
            onUserSelectChange={this.handleUserSelectChange.bind(this)}
            selectedUsers={roleObj[this.state.selectedRole]}
          />
        </Popover>
      </div>
    );
  }
}

CaseTeamSelector.displayName = 'CaseTeamSelector';

CaseTeamSelector.propTypes = {
  initCaseTeam: React.PropTypes.func,
  roles: React.PropTypes.object.isRequired,
  setUsersForCaseTeamRoles: React.PropTypes.func,
  teamRoles: React.PropTypes.array
};

export default CaseTeamSelector;
