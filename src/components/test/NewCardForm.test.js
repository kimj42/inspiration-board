import React from 'react';
import NewCardForm from '../NewCardForm.js';
import { shallow } from 'enzyme';

describe('NewCardForm', () => {
  test('see if NewCardForm works without any props', () => {
    const wrapper = shallow( <NewCardForm />);

    expect(wrapper).toMatchSnapshot();
  });
});
