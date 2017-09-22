import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { stub } from 'sinon';
import LoginForm from '../components/register_form';

describe('<RegisterForm />', () => {
  const handleSubmit = stub()
    .withArgs('username', 'password');
  const wrapper = shallow(<LoginForm handleSubmit={handleSubmit}/>);

  it('renders 2 input boxes' , () => {
    expect(wrapper.find('Input')).to.have.length(2)
  })

  it('should have a `<form>` element', () => {
      expect(
        wrapper.find('Form')).to.have.length(1)
    })

   it('should call handleSubmit', () => {
     wrapper.simulate('submit');
     expect(handleSubmit.calledOnce).to.equal(true);
   });
})
