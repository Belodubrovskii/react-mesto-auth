import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup (props) {

  const imageName = React.useRef();
  const imageLink = React.useRef();

  React.useEffect(() => {
    imageName.current.value = '';
    imageLink.current.value = '';
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({name: imageName.current.value, link: imageLink.current.value});
    imageName.current.value = '';
    imageLink.current.value = '';
    props.onClose();
  }

  return (
    <PopupWithForm name="add-card" title="Новое место" value="Добавить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={imageName}
        className="popup__input popup__form-image-title"
        type="text"
        name="name"
        id="title-input"
        placeholder="Название"
        required
        minLength="1"
        maxLength="30"
      />
      <span className="popup__error" id="title-input-error"></span>
      <input
        ref={imageLink}
        className="popup__input popup__form-image-link"
        type="url"
        name="link"
        id="link-input"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error" id="link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
