import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import DashboardHeader from '../components/dashboard_header';

describe('<DashboardHeader />', () => {
  const wrapper = mount(<DashboardHeader />);

  it('has one link', () => {
    expect(wrapper.find('a')).to.have.length(1);
  });

  it('has logout button', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('has a search input', () => {
    expect(wrapper.find('input')).to.have.length(1);
  });
})
