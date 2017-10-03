import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Pagination from '../components/pagination';

describe('<Pagination />', () => {
  const onClick = jest.fn()

  const wrapper = shallow(<Pagination pages={1} onClick={onClick}/>);
  it('renders the component', () => {
    shallow(<Pagination pages={1} onClick={onClick}/>);
  });

  it('renders a list', () => {
    expect(wrapper.find('.pagination')).to.have.length(1)
  });

  it('shows one list item', () => {
    expect(wrapper.find('li')).to.have.length(1)
  })

  it('calls onClick', () => {
    wrapper.simulate('click');
    expect(onClick.calledOnce).to.equal(true);
  })
})
