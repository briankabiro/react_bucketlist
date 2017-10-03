import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';
import ItemDashboard from '../containers/item_dashboard';

describe('<ItemDashboard />', () => {
  var server = sinon.fakeServer.create();
  server.respondWith('GET', '/bucketlist/1/items', '[]')
  const wrapper = mount(
    <MemoryRouter>
      <ItemDashboard />
    </MemoryRouter>
  );
  wrapper = wrapper.find('ItemDashboard').nodes[0];
  server.respond()

  it('displays dashboard header', () => {
    expect(wrapper.find('.nav')).to.have.length(1);
  });

  it('renders items', () => {
    expect(wrapper.find('.item')).to.have.length(0);
  });

  it('calls onSubmit', () => {
    wrapper.find('Form').simulate('submit');
    expect(handleSubmit.calledOnce).to.equal(true);
  })
})
