import React, { useState, useEffect } from 'react';

const Auth = ({
  soliciter,
  done
}) => {

  const EMPTY_INFO = {
    account: '',
    email: '',
    password: ''
  }

  const [tracker, setTracker] = useState('login');
  const [info, setInfo] = useState(EMPTY_INFO);

  const login = () => {
    soliciter
      .login(info)
      .then(results => {
        if (results.status === 201)
          done();
        resetInfo();
        alert('Invalid login');
      });
  }

  const signup = () => {
    soliciter
      .signup(info)
      .then(results => done())
      .catch(err => console.log('signup error: ', err));
  }

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    })
  }

  const loginPage = () => {
    return (
      <form>
        <label>Account</label>
        <input
          name='account'
          value={info.account}
          onChange={handleChange}/>
        <label>Password</label>
        <input
          name='password'
          value={info.password}
          onChange={handleChange}/>
        <div>
        <button
            type='button'
            onClick={() => login()}>login</button>
          <button
            type='button'
            onClick={() => setTracker('signup')}>register an account</button>
        </div>
      </form>
    );
  }

  const signupPage = () => {
    return (
      <form>
        <label>Account</label>
        <input
          name='account'
          value={info.account}
          onChange={handleChange}/>
        <label>Email</label>
        <input
          name='email'
          value={info.email}
          onChange={handleChange}/>
        <label>Password</label>
        <input
          name='password'
          value={info.password}
          onChange={handleChange}/>
        <div>
          <button
            type='button'
            onClick={() => signup()}>sign up</button>
          <button
            type='button'
            onClick={() => setTracker('login')}>return to login</button>
        </div>
      </form>
    )
  }

  const resetInfo = () => {
    setInfo(EMPTY_INFO);
  }

  useEffect(() => {
    resetInfo();
  }, [tracker]);

  switch (tracker) {
    case 'login':
      return loginPage();
      break;
    case 'signup':
      return signupPage();
      break;
    default:
      return null;
  }
}

export default Auth;