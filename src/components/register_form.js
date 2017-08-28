import React from 'react'

export default () => (
	<div>
		<h4>Login</h4>
		<form onSubmit={this.handleSubmit}>
			<label>Username</label>
			<input type="text" placeholder="Username"/>
			<label>Password</label>
			<input type="password" placeholder="Password"/>
			<button type='submit'>Register</button>
		</form>
		<p>Have an account? Login here</p>
	</div>
)

