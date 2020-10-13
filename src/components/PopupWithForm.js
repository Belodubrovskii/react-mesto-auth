import React from 'react';

function PopupWithForm (props) {
  return (
    <section className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <form onSubmit={props.onSubmit} className="popup__form" name={props.name}>
        <h4 className="popup__title">{props.title}</h4>
        {props.children}
        <input className="popup__button" type="submit" value={props.value} />
        <button onClick={props.onClose} className="popup__close-button" type="button" />
      </form>
     </section>
  );
}

export default PopupWithForm;
