import { useState } from 'react';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';

import { login, signup } from '../store/actions/user.actions.js';
import { LoginForm } from './LoginForm.jsx';

// const { useState } = React;

export function LoginSignup({ onSetUser }) {
  const [isSignup, setIsSignUp] = useState(false);

  function onLogin(credentials) {
    isSignup ? _signup(credentials) : _login(credentials);
  }

  async function _login(credentials) {
    try{
      login(credentials)
      showSuccessMsg('Logged in successfully')
    }catch{

      showErrorMsg('Oops try again')
    }
    
  }

  async function _signup(credentials) {
    try{
      signup(credentials)
      showSuccessMsg('Signed in successfully')
    }catch{

      showErrorMsg('Oops try again')
    }
    
  }

  return (
    <div className="login-page">
      <LoginForm onLogin={onLogin} isSignup={isSignup} />
      <div className="btns">
        <a href="#" onClick={() => setIsSignUp(!isSignup)}>
          {isSignup ? 'Already a member? Login' : 'New user? Signup'}
        </a>
      </div>
    </div>
  );
}
