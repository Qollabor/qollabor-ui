import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import PeopleList from './index';
import PeoplePopupList from './components/popupList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
  },
  {
    userName: 'emptykid',
    fullName: 'No Avatar or Action'
  }
];

storiesOf('PeopleList', module)
  .addDecorator((getStory) => <MuiThemeProvider muiTheme={getMuiTheme()}>{getStory()}</MuiThemeProvider>)
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
        <PeopleList maxPeopleInList={4} people={empty} onClick={action('Click on avatar')}/>
      </div>);
  })
  .add('Show list with people avatars with', () => (
    <div className="center-component">
      <PeoplePopupList people={samplePeople}/>
    </div>
  ))
  .add('When no list is provided show nothing', () => {
    const empty = [];
    return (
      <div className="center-component">
        <PeoplePopupList people={empty}/>
      </div>);
  });
