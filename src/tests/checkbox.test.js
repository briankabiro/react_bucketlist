import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import {sinon, stub} from 'sinon';
import Checkbox from '../components/checkbox';

describe('Checkbox', () => {
  it('returns unchecked box', () => {
    let wrapper = Checkbox({done: false})
    expect(wrapper.props.checked).to.equal(false)
  })
  
  it('returns checked box', () => {
    let wrapper = Checkbox({done: true})
    expect(wrapper.props.checked).to.equal(true)
  })
})
