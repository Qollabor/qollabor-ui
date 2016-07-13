import React from 'react';
import { Paper, Subheader } from 'material-ui';

import AvatarList from '../../../../components/people-list/components/avatarList';
import UserList from '../../../../components/people-list/components/userList';
import TextFilter from '../../../../components/text-filter/textFilter';

class CaseTeamSelector extends React.Component {
  render() {
    const roles = this.props.roles;
    const users = this.props.users;

    const samplePeople = [
      {
        userName: 'dannyk',
        fullName: 'Danny Kruitbosch',
        avatarUrl: 'https://lh6.googleusercontent.com/-wmA9kgZUUwo/AAAAAAAAAAI/AAAAAAAAABU/nPYkBB_N5x4/photo.jpg?sz=328',
        actionUrl: '#/profile/dannyk'
      },
      {
        userName: 'martijnvdp',
        fullName: 'Martijn van der Plaat',
        avatarUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/' +
        'AAEAAQAAAAAAAAOQAAAAJDg1NTc2OWUxLTY3YzAtNGQ0OS05NTUzLThmOWE2ODkzYTk4NQ.jpg',
        actionUrl: '#/profile/martijnvdp'
      },
      {
        userName: 'thijsp',
        fullName: 'Thijs Petter',
        avatarUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/03d/138/19f60a2.jpg',
        actionUrl: '#/profile/thijsp'
      },
      {
        userName: 'hansvb',
        fullName: 'Hans van de laatste bommel',
        avatarUrl: '',
        actionUrl: '#/profile/hansvb'
      },
      {
        userName: 'davidef',
        fullName: 'Davide Fiorello',
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
                    people={samplePeople}
                    maxLength={100}
                    users={users}
                  />
                </div>
              ))}
            </div>
          </Paper>
        </div>
        <div style={{ width: '49%', display: 'inline-block', marginLeft: 5, height: '100%', verticalAlign: 'top' }}>
          <Subheader style={{ paddingLeft: 0, lineHeight: 1 }}>Select Members for Role 'Manager'</Subheader>
          <Paper style={{ height: 350 }}>
            <div style={{ height: 170 }}>
              <Paper style={{ height: 170, overflowY: 'auto' }}>
                <UserList
                  maxPeopleInList={3}
                  people={samplePeople}
                  maxLength={100}
                />
              </Paper>
            </div>
            <div style={{ height: 175 }}>
              <Paper>
                <div style={{ height: 40 }}>
                  <TextFilter hintText="Search to select Users"/>
                </div>
                <div style={{ height: 120, overflowY: 'auto', display: 'inline-block', width: '100%' }}>
                  <UserList people={samplePeople} />
                </div>
              </Paper>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

CaseTeamSelector.displayName = 'Select Case Team';

CaseTeamSelector.propTypes = {
  roles: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

export default CaseTeamSelector;
