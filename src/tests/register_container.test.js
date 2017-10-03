import * as React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { expect } from 'chai';
import sinon from 'sinon';
import Register from '../containers/register_container';

describe('<Register />', () => {
  const wrapper = mount(
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      );
  it('renders the component', () => {
      mount(
      <MemoryRouter>
        <Register />
      </MemoryRouter>);
  })

  it('has alert class', () => {
    expect(wrapper.find('.alert')).to.have.length(1)
  })

  it('renders the register form', () => {
    expect(wrapper.find('form')).to.have.length(1)
  })
})
