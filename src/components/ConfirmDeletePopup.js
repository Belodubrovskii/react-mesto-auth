import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup (props) {

  const {isOpen, onClose, onCardDelete, selectedCard} = props;

  function handleSubmit (e) {
    e.preventDefault();

    onCardDelete(selectedCard);
  }

  return (
    <PopupWithForm name="delete-card" title="Вы уверены?" value="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />

  );
}

export default ConfirmDeletePopup;
