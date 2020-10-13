import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header (props) {

  const path = useLocation().pathname;


  return (
    <header className="header">
      <div className="header__logo"></div>
      {props.loggedIn ?
        <div className="header__container">
          <p className="header__user-email">{props.email}</p>
          <button className="header__logout-btn" onClick={props.onSignOut}>Выйти</button>
        </div>
        :
        <Link className="header__link" to={(path === '/signup') ? '/signin' : '/signup'}>
          {(path === '/signup') ? 'Войти' : 'Регистрация'}
        </Link>}
    </header>
  )
}

export default Header;
