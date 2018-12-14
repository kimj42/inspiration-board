import React from 'react';
import Card from '../Card.js';
import { shallow } from 'enzyme';

describe('Card', () => {

  test('card must work with test and emoji passed in as string', () => {
    const wrapper = shallow( <Card text={'hello testing card'} emoji={'heart_eyes'} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('card does not break if test and emjoi does not show up', () => {
    const wrapper = shallow( <Card />);

    expect(wrapper).toMatchSnapshot();
  });

});
