import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Bucketlist from '../components/bucketlist';

describe('<Bucketlist />', () => {
  const wrapper = shallow(<Bucketlist />)
  it('renders correctly', () => {
    expect(shallow(<Bucketlist id={1} />));
  })
})
