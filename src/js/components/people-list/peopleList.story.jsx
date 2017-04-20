import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { storiesOf, action } from '@kadira/storybook';
import PeopleList from './index';
import UserList from './components/userList';

const samplePeople = [
  {
    uniqueId: 'dannyk',
    name: 'Danny Kruitbosch',
    avatarUrl: 'https://lh6.googleusercontent.com/-wmA9kgZUUwo/AAAAAAAAAAI/AAAAAAAAABU/nPYkBB_N5x4/photo.jpg?sz=328'
  },
  {
    uniqueId: 'martijnvdp',
    name: 'Martijn van der Plaat',
    avatarUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/' +
    'AAEAAQAAAAAAAAOQAAAAJDg1NTc2OWUxLTY3YzAtNGQ0OS05NTUzLThmOWE2ODkzYTk4NQ.jpg'
  },
  {
    uniqueId: 'thijsp',
    name: 'Thijs Petter',
    avatarUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/03d/138/19f60a2.jpg'
  },
  {
    uniqueId: 'hansvb',
    name: 'Hans van de laatste bommel',
    avatarUrl: ''
  },
  {
    uniqueId: 'davidef',
    name: 'Davide Fiorello',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1465505001/test.jpg'
  },
  {
    uniqueId: 'emptykid',
    name: 'No Avatar or Action'
  }
];

storiesOf('PeopleList', module)
  .addDecorator(getStory => <MuiThemeProvider muiTheme={getMuiTheme()}>{getStory()}</MuiThemeProvider>)
  .add('Show list with people avatars with 150 with limit', () => (
    <div className="center-component">
      <PeopleList
        maxPeopleInList={4}
        people={samplePeople}
        maxLength={100}
        onClick={action('Click on avatar')}
      />
    </div>
  ))
  .add('Show list with people avatars with 200 with limit', () => (
    <div className="center-component">
      <PeopleList
        maxPeopleInList={4}
        people={samplePeople}
        maxLength={200}
        onClick={action('Click on avatar')}
      />
    </div>
  ))
  .add('When no list is provided show nothing', () => {
    const empty = [];
    return (
      <div className="center-component">
        <PeopleList maxPeopleInList={4} people={empty} onClick={action('Click on avatar')} />
      </div>);
  })
  .add('Show list with people avatars with', () => (
    <div className="center-component">
      <UserList people={samplePeople} />
    </div>
  ))
  .add('When no list is provided show nothing', () => {
    const empty = [];
    return (
      <div className="center-component">
        <UserList people={empty} />
      </div>);
  });
