import React from 'react';
import { Link } from 'react-router-dom';

function Login(props) {

  const [userData, setUserData] = React.useState({email: '', password: ''});

  function handleChange (e) {
    const name = e.target.name;
    setUserData({...userData, [name]: e.target.value});
  }

  function handleSubmit (e) {
    e.preventDefault();
    props.onLogin(userData.password, userData.email);
    setUserData({email: '', password: ''});
  }

  return (
      <form className="form" onSubmit={handleSubmit}>
        <h4 className="form__title">Вход</h4>
        <input
          onChange={handleChange}
          value={userData.email}
          name="email"
          className="form__input"
          type="email"
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          value={userData.password}
          name="password"
          className="form__input"
          type="password"
          minLength="6"
          placeholder="Пароль"
        />
        <input className="form__button" type="submit" value="Войти"/>
        <div className="form__wrapper">
          <p className="form__subscription">Ещё не зарегистрированы?&ensp;</p>
          <Link className="form__link" to="/signup">Регистрация</Link>
        </div>
      </form>
  )
}

export default Login;
