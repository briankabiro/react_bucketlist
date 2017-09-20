import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai'
import AddBucketlist from '../components/add_bucketlist';

describe('<AddBucketlist />', () => {
  const wrapper = shallow(<AddBucketlist />);

  it('renders add bucketlist component', () => {
    expect(wrapper.find('.add-bucketlist-form')).to.have.length(1);
  });

  it('renders inpput component', () => {
    expect(wrapper.find('input').at(0)).to.have.length(1);
  })
});
