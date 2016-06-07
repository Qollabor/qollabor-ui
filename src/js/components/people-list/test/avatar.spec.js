import { expect } from 'chai';
import { Avatar } from '../components/avatar';
import { shallow } from 'enzyme';
import React from 'react';

describe('component/avatar', () => {
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

  const avatarElement = shallow(<Avatar
    person={samplePeople[0]}
    padding={1}
    size={30}
  />);

  describe('Avatar has an actionUrl', () => {
    it('should have an onClick prop', () => {
      expect(avatarElement.find('Avatar').prop('onClick')).not.to.be.equal(undefined);
    });
  });

  describe('Avatar has an avatarUrl', () => {
    it('should have a src prop', () => {
      expect(avatarElement.find('Avatar').prop('src')).to.be.equal('https://lh6.googleusercontent.com/' +
      '-wmA9kgZUUwo/AAAAAAAAAAI/AAAAAAAAABU/nPYkBB_N5x4/photo.jpg?sz=328');
    });
  });

  describe('Avatar does not have an avatarUrl', () => {
    const avatarNoUrl = shallow(<Avatar
      person={samplePeople[3]}
      padding={1}
      size={30}
    />);

    it('should show an intial', () => {
      expect(avatarNoUrl.find('Avatar').children().text()).to.be.equal('HB');
    });
  });
});
