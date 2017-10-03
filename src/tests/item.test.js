import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Item from '../components/item';

describe('Item', () => {
  it('renders the component', () => {
    shallow(<Item />);
  });
});
