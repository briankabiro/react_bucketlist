import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import ItemDashboard from '../containers/dashboard';

describe('<ItemDashboard />', () => {
  var server = sinon.fakeServer.create();
  server.respondWith('GET', '/bucketlists', '[]')
  const wrapper = mount(<ItemDashboard />)
  server.respond()

  it('displays dashboard header', () => {
    expect(wrapper.find('Nav')).to.have.length(1)
  })

  it('renders add item form', () => {
    expect(wrapper.find('Form')).to.have.length(1)
  })
})
