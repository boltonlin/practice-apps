import React, { useState, useEffect } from 'react';
import Auth from './Auth.jsx';

const App = ({
  soliciter
}) => {

  const [page, setPage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);

  const checkLoginStatus = () => {
    soliciter
      .checkStatus()
      .then(setIsLoggedIn)
      .catch(err => console.log('check login: ', err));
  }

  const logout = () => {
    soliciter
      .logout()
      .then(results => {
        console.log(results);
        setCheckLogin(!checkLogin);
      })
      .catch(err => console.log('logout: ', err));
  }

  const authForm = () => {
    return (
      <Auth soliciter={soliciter} done={() => setPage('index')} />
    );
  }

  const index = () => {
    return (
      <>
      {isLoggedIn?
        <button type='button' onClick={logout}>logout</button>:
        <button type='button' onClick={() => route('auth')}>login</button>}
      <button
        type="button"
        onClick={() => isLoggedIn ? route('checkout') : route('auth')}>
          checkout
      </button>
      </>
    );
  }

  const route = (pagename) => {
    switch (pagename) {
      case 'index':
        setPage('index');
        break;
      case 'auth':
        setPage('auth');
        break;
      case 'checkout':
        setPage('checkout');
        break;
    }
    return;
  }

  useEffect(() => {
    checkLoginStatus();
    route('index');
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [page]);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLogin]);

  return (
    <div>
      <div>
        <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>
      </div>
      {page === 'index' && index()}
      {page === 'auth' && authForm()}
      {page === 'checkout' && <div>checkout wow</div>}
    </div>
  );
};

export default App;