import React from 'react';
import { Subheader, Popover } from 'material-ui';
import AvatarList from '../../../../components/people-list/components/avatarList';
import { UserSelector } from '../../components/user-selector';

const samplePeople = [{
  uniqueId: 'martijnvdp',
  name: 'Martijn van der Plaat',
  avatarUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/' +
  'AAEAAQAAAAAAAAOQAAAAJDg1NTc2OWUxLTY3YzAtNGQ0OS05NTUzLThmOWE2ODkzYTk4NQ.jpg',
  actionUrl: '#/profile/martijnvdp'
}, {
  uniqueId: 'thijsp',
  name: 'Thijs Petter',
  avatarUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/03d/138/19f60a2.jpg',
  actionUrl: '#/profile/thijsp'
}, {
  uniqueId: 'hansvb',
  name: 'Hans van de laatste bommel',
  avatarUrl: '',
  actionUrl: '#/profile/hansvb'
}, {
  uniqueId: 'davidef',
  name: 'Davide Fiorello',
  avatarUrl: 'https://pbs.twimg.com/profile_images/1465505001/test.jpg',
  actionUrl: '#/profile/davidef'
}];

class CaseTeamSelector extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      caseTeam: props.roles.reduce((obj, role) => {
        obj[role] = [];
        return obj;
      }, {}),
      open: false,
      anchorEl: null,
      selectedRole: null
    };
  }

  handleUserSelectChange(user, selected) {
    const caseTeam = this.state.caseTeam;
    const caseTeamItem = caseTeam[this.state.selectedRole];
    const index = caseTeamItem.findIndex((item) => item.uniqueId === user);

    // FIXME : Temporary fix to get user objects
    const userObj = samplePeople.find((item) => item.uniqueId === user);

    if (!selected) {
      caseTeamItem.splice(index, 1);
    } else if (selected && index === -1) {
      caseTeamItem.push(userObj);
    }

    this.setState({
      caseTeam
    });
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
    const roles = this.props.roles;
    return (
      <div>
        <div style={{ height: 350 }}>
          {roles.map((role) => (
            <div style={{ height: 100, marginLeft: 15 }}>
              <Subheader style={{ paddingLeft: 0 }}>{role}</Subheader>
              <AvatarList
                maxPeopleInList={10}
                people={this.state.caseTeam[role]}
                maxLength={300}
                onShowMoreAction={this.handleRequestOpen.bind(this, role)}
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
          <UserSelector users={samplePeople} onUserSelectChange={this.handleUserSelectChange.bind(this)} />
        </Popover>
      </div>
    );
  }
}

CaseTeamSelector.displayName = 'CaseTeamSelector';

CaseTeamSelector.propTypes = {
  roles: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

export default CaseTeamSelector;
