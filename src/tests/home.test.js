import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Home from '../containers/home';

describe('<Home />', () => {
  const wrapper = shallow(<Home />);
  it('renders the component', () => {
    shallow(<Home />)
  })

  it('has 3 links', () => {
    expect(wrapper.find('Link')).to.have.length(3)
  })
})
