import React, { PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm.jsx';

class SignUpPage extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			errors: {},
			user: {
				email: '',
				name: '',
				password: ''
			}
		};

		this.processForm = this.processForm.bind(this);
		this.changeUser = this.changeUser.bind(this);
	}

	changeUser(event) {
		console.log(this.context);
		const field = event.target.name;
		const user = this.state.user;
		user[field] = event.target.value;
		this.setState({
			user
		});
	}

	processForm(event) {
		event.preventDefault();

		const name = encodeURIComponent(this.state.user.name);
		const email = encodeURIComponent(this.state.user.email);
		const password = encodeURIComponent(this.state.user.password);
		const formData = `name=${ name }&email=${ email }&password=${ password }`;

		const xhr = new XMLHttpRequest();
		xhr.open('post', '/auth/signup');
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.responseType = 'json';
		xhr.addEventListener('load', () => {
			if(xhr.status === 200) {
				//success
				console.log('post request succeded');
				//change the component-container state
				this.setState({
					errors: {}
				});

				localStorage.setItem('successMessage', xhr.response.message);

				this.context.router.replace('/login');

			} else { 
				//failure
				console.log('post request failed with this error: ', xhr.response.message);

				const errors = xhr.response.errors ? xhr.response.errors : {};
				
				errors.summary = xhr.response.message;
				this.setState({
					errors
				});
			}

		});

		xhr.send(formData);
	}

	render() {
		return (
			<SignUpForm
				onSubmit={this.processForm}
				onChange={this.changeUser}
				errors={this.state.errors}
				user={this.state.user}
			/>
		);
	}
}

SignUpPage.contextTypes =  {
	router: PropTypes.object.isRequired
};

export default SignUpPage;

