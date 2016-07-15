import React from 'react';
import { Paper, Subheader } from 'material-ui';

import AvatarList from '../../../../components/people-list/components/avatarList';
import { UserSelector } from '../../components/user-selector';


class CaseTeamSelector extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      caseTeam: props.roles.reduce((obj, role) => {
        obj[role] = {};
        return obj;
      }, {})
    };
  }

  handleOnChange(role, users) {
    const caseTeam = this.state.caseTeam;
    caseTeam[role] = users;
    this.setState({
      caseTeam
    });
  }

  render() {
    const roles = this.props.roles;

    const samplePeople = [
      {
        uniqueId: 'dannyk',
        name: 'Danny Kruitbosch',
        avatarUrl: 'https://lh6.googleusercontent.com/-wmA9kgZUUwo/AAAAAAAAAAI/AAAAAAAAABU/nPYkBB_N5x4/photo.jpg?sz=328',
        actionUrl: '#/profile/dannyk'
      },
      {
        uniqueId: 'martijnvdp',
        name: 'Martijn van der Plaat',
        avatarUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/' +
        'AAEAAQAAAAAAAAOQAAAAJDg1NTc2OWUxLTY3YzAtNGQ0OS05NTUzLThmOWE2ODkzYTk4NQ.jpg',
        actionUrl: '#/profile/martijnvdp'
      },
      {
        uniqueId: 'thijsp',
        name: 'Thijs Petter',
        avatarUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/03d/138/19f60a2.jpg',
        actionUrl: '#/profile/thijsp'
      },
      {
        uniqueId: 'hansvb',
        name: 'Hans van de laatste bommel',
        avatarUrl: '',
        actionUrl: '#/profile/hansvb'
      },
      {
        uniqueId: 'davidef',
        name: 'Davide Fiorello',
        avatarUrl: 'https://pbs.twimg.com/profile_images/1465505001/test.jpg',
        actionUrl: '#/profile/davidef'
      }];
    return (
      <div>
        <div style={{ width: '49%', display: 'inline-block', height: '100%', verticalAlign: 'top' }}>
          <Subheader style={{ paddingLeft: 0, lineHeight: 1 }}>Selected Case Team</Subheader>
          <Paper>
            <div style={{ height: 350 }}>
              {roles.map((role) => (
                <div style={{ height: 100, marginLeft: 15 }}>
                  <Subheader style={{ paddingLeft: 0 }}>{role}</Subheader>
                  <AvatarList
                    maxPeopleInList={3}
                    people={samplePeople/* this.state.caseTeam[role]*/}
                    maxLength={100}
                  />
                </div>
              ))}
            </div>
          </Paper>
        </div>
        <div style={{ width: '49%', display: 'inline-block', marginLeft: 5, height: '100%', verticalAlign: 'top' }}>
          <Subheader style={{ paddingLeft: 0, lineHeight: 1 }}>Select Members for Role 'Manager'</Subheader>
          <Paper style={{ height: 350 }}>
            <UserSelector users={samplePeople} onChange={this.handleOnChange.bind(this)} />
          </Paper>
        </div>
      </div>
    );
  }
}

CaseTeamSelector.displayName = 'CaseTeamSelector';

CaseTeamSelector.propTypes = {
  roles: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

export default CaseTeamSelector;
