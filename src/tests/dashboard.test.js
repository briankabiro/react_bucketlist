import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Dashboard from '../containers/dashboard';

describe('<Dashboard />', () => {
  const wrapper = mount(<Dashboard />)
  function return_empty(){
    return [];
  }
  beforeEach(() => {
    sinon.stub(Dashboard, 'get_bucketlists').callsFake(return_empty)
  })

  xit('calls component will mount', () => {
    console.log('this si dashboard', Dashboard.get_bucketlists())
    sinon.stub(Dashboard, 'get_bucketlists').returns('[]');
    sinon.spy(Dashboard, 'componentWillMount');
    expect(Dashboard.componentWillMount.calledOnce).to.equal(true);
  })

  xit('displays dashboard header', () => {
    expect(wrapper.find('Nav')).to.have.length(1)
  })
})
