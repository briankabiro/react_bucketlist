import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { expect } from 'chai';
import sinon from 'sinon';
import Login from '../containers/login_container';

describe('<Login />', () => {
  let wrapper = shallow(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  it('renders the component', () => {
      shallow(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );
  })

  wrapper = wrapper.find('Login').nodes[0];
  it('shows error message', () => {
    expect(wrapper.find('.alert')).to.have.length(1)
  })

  it('renders the login form', () => {
    expect(wrapper.find('form')).to.have.length(1)
  });

  it('redirects to dashboard', () => {
    wrapper.handleSubmit()
    expect(wrapper.state.redirect).to.be(true);
  })

  it('sets visibility to false', () => {
    wrapper.onDismiss()
    expect(wrapper.state.visible).to.equal(false)
  })
})
