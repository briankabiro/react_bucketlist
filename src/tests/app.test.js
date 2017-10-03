import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Router from '../containers/router';

describe('<Router />', () => {
  it('renders App', () => {
    shallow(<Router />);
  })
})
