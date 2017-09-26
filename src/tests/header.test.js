import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Header from '../components/header';

describe('<Header />', () => {
  const wrapper = shallow(<Header />);

  it('has 3 links', () => {
    expect(wrapper.find('Link')).to.have.length(3)
  })

  it('links to homepage', () => {
    expect(wrapper.find('Link').first().prop('to')).to.equal('/')
  })
})
