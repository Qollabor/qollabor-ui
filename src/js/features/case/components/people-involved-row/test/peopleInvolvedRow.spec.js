import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import PeopleInvolvedRow from '../index';

describe('feature/case/component/PeopleInvolvedRow', () => {
  describe('show involved person with no action and no avatar', () => {
    const involvedPerson = [{
      userName: 'emptykid',
      fullName: 'No Avatar or Action'
    }];

    const PeopleInvolvedRowElement = shallow(
      <PeopleInvolvedRow maxPeopleInList={5} people={involvedPerson} />
    );

    it('should show a none clickable avatar with the initals of the person', () => {
      expect(PeopleInvolvedRowElement.find('Avatar').prop('onClick')).to.be.equal(undefined);
      expect(PeopleInvolvedRowElement.find('Avatar').children().text()).to.be.equal('NA');
    });
  });

  describe('show involved person with no action and avatar', () => {
    const involvedPerson = [{
      userName: 'davidef',
      fullName: 'Davide Fiorello',
      avatarUrl: 'avatar.jpg'
    }];

    const PeopleInvolvedRowElement = shallow(
      <PeopleInvolvedRow maxPeopleInList={5} people={involvedPerson} />
    );

    it('should show a none clickable avatar with image of the person', () => {
      expect(PeopleInvolvedRowElement.find('Avatar').prop('onClick')).to.be.equal(undefined);
      expect(PeopleInvolvedRowElement.find('Avatar').prop('src')).to.be.equal('avatar.jpg');
    });
  });

  describe('show involved person with action and avatar', () => {
    const involvedPerson = [{
      userName: 'davidef',
      fullName: 'Davide Fiorello',
      avatarUrl: 'avatar.jpg',
      actionUrl: '#/profile/davidef'
    }];

    const PeopleInvolvedRowElement = shallow(
      <PeopleInvolvedRow maxPeopleInList={5} people={involvedPerson} />
    );

    it('should show a clickable avatar with image of the person', () => {
      expect(PeopleInvolvedRowElement.find('Avatar').prop('src')).to.be.equal('avatar.jpg');
      expect(PeopleInvolvedRowElement.find('Avatar').prop('onClick')).not.to.be.equal(undefined);
    });
  });

  describe('show involved person with action and no avatar', () => {
    const involvedPerson = [{
      userName: 'davidef',
      fullName: 'Davide Fiorello',
      avatarUrl: '',
      actionUrl: '#/profile/davidef'
    }];

    const PeopleInvolvedRowElement = shallow(
      <PeopleInvolvedRow maxPeopleInList={5} people={involvedPerson} />
    );

    it('should show a clickable avatar with initials of the person', () => {
      expect(PeopleInvolvedRowElement.find('Avatar').prop('onClick')).not.to.be.equal(undefined);
      expect(PeopleInvolvedRowElement.find('Avatar').children().text()).to.be.equal('DF');
    });
  });

  describe('show involved person with no avatar and no fullname', () => {
    const involvedPerson = [{
      userName: 'davidef'
    }];

    const PeopleInvolvedRowElement = shallow(
      <PeopleInvolvedRow maxPeopleInList={5} people={involvedPerson} />
    );

    it('should show an avatar with a default initial value', () => {
      expect(PeopleInvolvedRowElement.find('Avatar').prop('onClick')).to.be.equal(undefined);
      expect(PeopleInvolvedRowElement.find('Avatar').children().text()).to.be.equal('XX');
    });
  });

  describe('show nothing when zero persons are involved', () => {
    const involvedPerson = [];

    const PeopleInvolvedRowElement = shallow(
      <PeopleInvolvedRow maxPeopleInList={5} people={involvedPerson} />
    );

    expect(PeopleInvolvedRowElement.html()).to.be.equal('<div></div>');
  });
});
