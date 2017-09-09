import React from 'react'

export default (props) => (
	<form className= "form" onSubmit={props.handleSubmit}>
		<label>Username</label>
		<input type="text" name = "username" placeholder="Username"/>
		<label>Password</label>
		<input type="password" name = "password" placeholder="Password"/>
		<button type='submit'>Login</button>
	</form>
)