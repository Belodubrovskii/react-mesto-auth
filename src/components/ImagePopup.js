import React from 'react';

function ImagePopup (props) {
  return (
  <section className={`popup popup_photo ${props.isOpen ? 'popup_opened' : ''}`}>
    <div className="popup__container">
      <img className="popup__image" alt={`Фотография места ${props.selectedCard.name}`} src={props.selectedCard.link} />
      <p className="popup__image-subscription">{props.selectedCard.name}</p>
      <button onClick={props.onClose} className="popup__close-button" type="button" />
    </div>
  </section>
  );
}

export default ImagePopup;
