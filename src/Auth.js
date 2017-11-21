import React, {Component} from 'react';
import { authorizeUser } from "./AuthorizeApi";
import { Redirect } from "react-router-dom";

class Auth extends Component {

  constructor(props) {
    super(props);
    const initialState = this.props.isAuthorized;
    this.state = {
      email: '',
      password: '',
      error: false,
      isAuthorized: initialState
    };
  };

  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    const { email, password } = this.state;
    authorizeUser(email, password);
    this.setState({ error: !this.state.isAuthorized });

  };

  componentWillReceiveProps = (nextProps) => {
    this.setState(
      { isAuthorized: nextProps.isAuthorized }
    );
  };


  render() {

    return this.state.isAuthorized ? (
      <Redirect from='/auth' to='/' />
    ) : (
      <div>
        <input
          type='text'
          name='email'
          onChange={this.handleOnChange}
        />
        <input
          type='password'
          name='password'
          onChange={this.handleOnChange}
        />
        <button type = 'button' onClick = {this.handleSubmit}> Посетить сверх секретную страницу </button>

        {this.state.error && <p className='error'>Неправильно введен email/пароль</p>}
      </div>
    );
  }
}

export default Auth;
