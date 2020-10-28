import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

  const [userData, setUserData] = React.useState({email: '', password: ''});

  function handleChange (e) {
    const name = e.target.name;
    setUserData({...userData, [name]: e.target.value});
  }

  function handleSubmit (e) {
    e.preventDefault();
    props.onRegister(userData.password, userData.email);
    setUserData({email: '', password: ''});
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h4 className="form__title">Регистрация</h4>
      <input
        onChange={handleChange}
        className="form__input"
        value={userData.email}
        name="email"
        type="email"
        placeholder="Email"
      />
      <input
        onChange={handleChange}
        className="form__input"
        value={userData.password}
        type="password"
        minLength="6"
        name="password"
        placeholder="Пароль"
        pattern="^\S+$"
      />
      <input className="form__button" type="submit" value="Зарегистрироваться"/>
      <div className="form__wrapper">
        <p className="form__subscription">Уже зарегистрированы?&ensp;</p>
        <Link className="form__link" to="/signin">Войти</Link>
      </div>
    </form>
  )
}

export default Register;

