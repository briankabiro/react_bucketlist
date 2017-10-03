import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { stub } from 'sinon';
import AddBucketlist from '../components/add_bucketlist';

describe('<AddBucketlist />', () => {
  const handleSubmit = stub().withArgs('name');
  const wrapper = shallow(
    <AddBucketlist
      handleSubmit={(event) => handleSubmit(event)}
    />);

  it('renders add bucketlist form', () => {
    expect(wrapper.find('.add-bucketlist-form')).to.have.length(1);
  });

  it('renders 1 input boxes', () => {
    expect(wrapper.find('Input')).to.have.length(1);
  })

  it('submits a form when CTA is clicked', () => {
    wrapper.find('Form').simulate('submit');
    expect(handleSubmit.calledOnce).to.equal(true);
  });
});
