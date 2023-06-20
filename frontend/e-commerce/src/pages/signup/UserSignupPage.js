
import React, { Component } from 'react'
import { signup } from '../../api/SignUpApiService';
import Input from '../../components/Input';

class UserSignupPage extends React.Component {

    state = {
        username: null,
        name: null,
        lastName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        error: {}
    };

    onChange = event => {
        const { name, value } = event.target;
        const errors = { ...this.state.error};
        errors[name] = undefined;
        
        if (name === "password" || name === "passwordRepeat") {
            if(name === "password" && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = "Password mismatch";
            } else if(name === "passwordRepeat" && value !== this.state.password) {
                errors.passwordRepeat = "Password mismatch";
            } else {
                errors.passwordRepeat = undefined;
            }
        }
        this.setState({
            [name] : value,
            errors
        })
    }

    onClickSignup = async event => {
        event.preventDefault();

        const { username, name, lastName, password } = this.state;

        const body = {
            username,
            name,
            lastName,
            password
        };
        this.setState( {pendingApiCall: true} );

        try {
            const response = await signup(body);
        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({errors: error.response.data.validationErrors})
            }
        }

        this.setState({pendingApiCall: false});
    }
    
    render() {

        return (
            <div className='container'>
                <form>
                    <h1 className='text-center'>Sign Up</h1>
                    <Input name="username" label="Username" error={username} onChange={this.onChange}/>
                    <Input name="name" label="Name" error={name} onChange={this.onChange} />
                    <Input name="lastName" label="LastName" error={lastName} onChange={this.onChange} />
                </form>
            </div>
        )
    }
}


export default UserSignupPage