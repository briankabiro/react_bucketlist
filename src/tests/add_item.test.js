import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { stub } from 'sinon';
import AddItem from '../components/add_item';

describe('<AddItem />', () => {
  const handleSubmit = stub().withArgs('name');
  const wrapper = shallow(
    <AddItem
      handleSubmit={(event) => handleSubmit(event)}
    />);

  it('renders add item form', () => {
    expect(wrapper.find('.add-item-form')).to.have.length(1);
  });

  it('renders 1 input boxes', () => {
    expect(wrapper.find('Input')).to.have.length(1);
  })

  it('submits a form when CTA is clicked', () => {
    wrapper.find('Form').simulate('submit');
    expect(handleSubmit.calledOnce).to.equal(true);
  });
});
