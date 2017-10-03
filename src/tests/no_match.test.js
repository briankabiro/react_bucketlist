import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import NoMatch from '../components/no_match';

describe('No_Match', () => {
  it('renders correctly', () => {
    shallow(<NoMatch />)
  })
})
