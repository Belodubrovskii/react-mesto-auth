import React from 'react';
import { CurrentUserContext } from '../contexts/currentUserContext';

function Card (props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = currentUser._id === props.card.owner._id;
  const isLiked = props.card.likes.some(item => item._id === currentUser._id);

  function handleClick () {
    props.onCardClick(props.card);
  }

  return (
  <div className="card">
    <img onClick={handleClick} className="card__image" alt={`Фотография места ${props.card.name}`} src={props.card.link}/>
    <div className="card__wrapper">
      <h3 className="card__subscription">{props.card.name}</h3>
      <div className="card__like-wrapper">
        <button onClick={() => {props.onCardLike(props.card)}} className={`card__like ${isLiked ? 'card__like_active' : ''}`} />
        <span className="card__number-of-likes">{props.card.likes.length}</span>
      </div>
      {isOwn && <button className="card__recycle-bin" onClick={() => props.onCardDelete(props.card)}/>}
    </div>
  </div>
  )
}

export default Card;
