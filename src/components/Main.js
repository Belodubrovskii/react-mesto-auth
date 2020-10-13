import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/currentUserContext';

function Main (props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
          <button onClick={props.onEditAvatar} className="profile__avatar-edit"></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button onClick={props.onEditProfile} className="profile__edit-btn"></button>
          <p className="profile__activity">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} className="profile__add-btn" type="button"></button>
      </section>

      <section className="popup popup_delete-card">
        <form className="popup__form" noValidate>
          <h4 className="popup__title popup__title_wihout-unput">Вы уверены?</h4>
          <input className="popup__button" type="submit" value="Да"/>
          <button className="popup__close-button" type="button"></button>
        </form>
      </section>

      <section className="cards">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
