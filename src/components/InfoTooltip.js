import React from 'react';

function InfoTooltip (props) {

  return (
    <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__wrapper">
        <img className="popup__picture" alt="Картинка" src={props.image}/>
        <p className="popup__subscription">{props.subscription}</p>
        <button onClick={props.onClose} className="popup__close-button popup__close-button_up" type="button" />
      </div>
    </section>
  )
}

export default InfoTooltip;
