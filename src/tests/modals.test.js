import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import UpdateItem from '../components/update_item';
import UpdateBucketlist from '../components/update_bucketlist';

describe('<UpdateBucketlist', () => {
  it('renders correctly', () => {
    shallow(<UpdateBucketlist />)
  })
})

describe('<UpdateItem', () => {
  it('renders correctly', () => {
    shallow(<UpdateItem />)
  })
})
