import React, {Component} from 'react'
import Header from '../components/header'
import RegisterForm from '../components/register_form'

export default class Register extends Component{
	render(){
		return (
		<div>
			<Header />
			<div>
				<RegisterForm />
			</div>
		</div>
		)
	}
}