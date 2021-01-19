# People-list

A People-list component

## Usage

```
import { Peoplelist } from 'cafienne-ui-elements';

const samplePeopleList = [
  {
    userName: 'dannyk',
    fullName: 'Danny Kruitbosch',
    avatarUrl: 'https://lh6.googleusercontent.com/-wmA9kgZUUwo/AAAAAAAAAAI/AAAAAAAAABU/nPYkBB_N5x4/photo.jpg?sz=328',
    userId: 'dannyk'
  },
  {
    userName: 'martijnvdp',
    fullName: 'Martijn van der Plaat',
    avatarUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/' +
    'AAEAAQAAAAAAAAOQAAAAJDg1NTc2OWUxLTY3YzAtNGQ0OS05NTUzLThmOWE2ODkzYTk4NQ.jpg',
    userId: 'martijnvdp'
  },
  {
    userName: 'thijsp',
    fullName: 'Thijs Petter',
    avatarUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/03d/138/19f60a2.jpg',
    userId: 'thijsp'
  },
  {
    userName: 'hansvb',
    fullName: 'Hans van de laatste bommel',
    avatarUrl: '',
    userId: 'hansvb'
  },
  {
    userName: 'davidef',
    fullName: 'Davide Fiorello',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1465505001/test.jpg',
    userId: 'davidef'
  },
  {
    userName: 'emptykid',
    fullName: 'No Avatar or Action'
  }
];


...
<PeopleList
  maxPeopleInList={4}
  people={samplePeopleList}
  maxLength={100}
  onClick={action('Click on avatar')}
  avatarSize={30}
/>
```

### Props

| Name          | Type      | Required | Values        | Description |
|---------------|-----------|:--------:|---------------|-------------|
|people          |array<Item>|YES       |[{}, {}, ...]| The list of people with avatar
|maxPeopleInList      |number     | YES   | 5 | A fixed maximum of avatars in the row
|maxLength| number| NO| 100| Maximum number of pixels the avatars will use in the row
|onClick | function| NO| action('click avatar')| The function which will be executed when clicking on an avatar
|avatarSize | number| NO| 30| Default size of an avatar

#### The `people` object
| Name          | Type      | Required | Values        | Description |
|---------------|-----------|:--------:|---------------|-------------|
|userName          |string     |YES       |"martijnvdp" |Username behind the avatar
|fullName            |string     | YES   |"Martijn van der Plaat" |The fullname of the user behind the avatar
|avatarUrl | string| NO | "http://url/avatar.jpg" | location of the avatar image
|userId | string| NO | "martijnvdp" | userId passed when clicking on the avatar
