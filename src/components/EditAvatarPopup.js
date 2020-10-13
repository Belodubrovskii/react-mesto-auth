import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup (props) {

  const inputAvatarRef = React.useRef();

  React.useEffect(() => {
    inputAvatarRef.current.value = '';
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(inputAvatarRef.current.value);
  }

  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар" value="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputAvatarRef}
        className="popup__input popup__form-image-link"
        type="url"
        name="avatar"
        placeholder="Ссылка на новый аватар"
        required
      />
      <span className="popup__error" id="link-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
