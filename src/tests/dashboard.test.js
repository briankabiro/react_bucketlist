import * as React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { expect } from 'chai';
import sinon from 'sinon';
import Dashboard from '../containers/dashboard';

describe('<Dashboard />', () => {
  const server = sinon.fakeServer.create();
  server.respondWith('GET', '/bucketlists', '{"results":{"id":288, "items":[], "name":"mada", "owned_by":10}, "pages": 1}')
  let wrapper = mount(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
  server.respond();
  wrapper = wrapper.find('Dashboard').nodes[0];

  it('renders bucketlists', () => {
    wrapper.get_bucketlists();
    expect(wrapper.state.bucketlists).to.equal(1);
  });

  it('calls logout', () => {
    wrapper.logout();
    expect(wrapper.state.redirect).to.equal(true);
  });

  it('toggles the update modal', () => {
    wrapper.toggleUpdateModal(1);
    expect(wrapper.state.selectedBucketlist).to.equal(1);
    expect(wrapper.state.showModal).to.equal(true);
  })

  it('toggles the delete modal', () => {
    wrapper.toggleDeleteModal(1);
    expect(wrapper.state.selectedBucketlist).to.equal(1);
    expect(wrapper.state.showModal).to.equal(true);
  });

  it('closes when update is successful', () => {
    wrapper.updateTitle(1);
    expect(toggleUpdateModal.to.beCalledOnce).to.equal(true);
  })

  it('calls get bucketlists when update is successful', () => {
    wrapper.updateTitle(1);
    expect(wrapper.state.bucketlists).to.have.length(1);
  })

  it('sets pagination page correctly', () => {
    wrapper.handlePagination(1);
    expect(wrapper.state.currentPage).to.equal(1);
  })
});
