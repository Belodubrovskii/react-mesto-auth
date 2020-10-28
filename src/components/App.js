import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Main from './Main';
import ProtectedRoute from './ProtectedRoute';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { register, authorize, isTokenValid } from '../utils/auth';
import { CurrentUserContext } from '../contexts/currentUserContext';
import checkImage from '../images/check.svg';
import crossImage from '../images/cross.svg';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({name: '', about: ''});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [infoTooltipImage, setInfoTooltipImage] = React.useState(checkImage);

  const history = useHistory();

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setLoggedIn(true);
    }
  },[])

  React.useEffect(() => {

    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      isTokenValid(jwt)
      .then((res) => {
          setEmail(res.email);
          setLoggedIn(true);
          history.push('/');

          Promise.all([api.getUserInfo(), api.getInitialCards()])
          .then(data => {
            setCurrentUser(data[0].data);
            setCards(data[1]);
          })
          .catch(err => console.log(`Ошибка: ${err}`));
      })
      .catch(() => {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        history.push('/signin');
      })
    } else {
      history.push('/signin');
    }
  },[history, loggedIn])

  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick () {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups () {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setImagePopupOpen(false)
    setInfoTooltipPopupOpen(false);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleUpdateUser (name, activity) {
    api.updateUserInfo(name, activity)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  function handleUpdateAvatar (avatar) {
    api.updateAvatar(avatar)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    setConfirmDeletePopupOpen(true);
  }

  function hadleCardDelete(card) {

    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => {
          return  c._id !== card._id;
        })
        setCards(newCards);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(userId => userId === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {

        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  function handleAddPlaceSubmit (card) {
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard,...cards])
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  function handleRegisterSubmit (password, email) {
    register(password, email)
      .then((res) => {
          if (res) {
            setMessage('Вы успешно зарегистрировались!');
            setInfoTooltipImage(checkImage);
            setInfoTooltipPopupOpen(true);
            history.push('/signin');
            return;
          }
      })
      .catch(() => {
        setMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setInfoTooltipImage(crossImage);
        setInfoTooltipPopupOpen(true);
      })
  }

  function handleLoginSubmit (password, email) {
    authorize(password, email)
      .then(() => {
          setEmail(email);
          setLoggedIn(true);
          history.push('/');
          return;
      })
      .catch(() => {
        setMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setInfoTooltipImage(crossImage);
        setInfoTooltipPopupOpen(true);
      })
  }

  function handleSignOut () {
    setEmail('');
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  return (
    // <HashRouter>
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} loggedIn={loggedIn} onSignOut={handleSignOut}/>
        <Switch>
          <Route path="/signin">
            <Login onLogin={handleLoginSubmit}/>
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegisterSubmit}/>
          </Route>
          <ProtectedRoute path="/" loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
            cards={cards}
          />
        </Switch>

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          subscription={message}
          image={infoTooltipImage}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={hadleCardDelete}
          selectedCard={selectedCard}
        />

        <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}/>

        <Footer />
      </CurrentUserContext.Provider>
    </div>
    // </HashRouter>
  );
}

export default App;

