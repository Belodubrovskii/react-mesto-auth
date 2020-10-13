import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/currentUserContext';

function EditProfilePopup (props) {

  const [value, setValue] = React.useState({name: '', activity: ''});
  const currentUser = React.useContext(CurrentUserContext);

  function handleChange (e) {
    const inputName = e.target.name;
    setValue({...value, [inputName]: e.target.value})
  }

  function handleSubmit (e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser(value.name, value.activity)
  }

  React.useEffect(() => {
    setValue({name: currentUser.name, activity: currentUser.about})
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" value="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={value.name}
        onChange={handleChange}
        className="popup__input popup__form-name"
        type="text"
        name="name"
        id="name-input"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        pattern="[А-ЯЁа-яёA-Za-z -]{1,}"
      />
      <span className="popup__error" id="name-input-error"></span>
      <input
        value={value.activity}
        onChange={handleChange}
        className="popup__input popup__form-activity"
        type="text"
        name="activity"
        id="activity-input"
        placeholder="Занятие"
        required
        minLength="2"
        maxLength="40"
        pattern="[А-ЯЁа-яёA-Za-z -]{1,}"
      />
      <span className="popup__error" id="activity-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
