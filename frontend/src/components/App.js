import React from "react";
import Header from "./Header.js";

import Main from "./Main.js";
import api from "./../utils/api";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import SubmitDeletePopup from "./SubmitDeletePopup.js";
import InfoTooltip from "./InfoTooltip.js";

import { CurrentUserContext } from "./../contexts/CurrentUserContext.js";

import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import Register from "./Register.js";
import * as auth from "./../utils/auth.js";

function App() {
  //попапы
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isSubmitDeletePopupOpen, setSubmitDeletePopupOpen] =
    React.useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  //попапы

  const [popupMessage, setPopupMessage] = React.useState("");
  const [isTooltipMistake, setIsTooltipMistake] = React.useState(false);

  const [userEmail, setUserEmail] = React.useState("");

  //открытие попапов
  const handleEditProfileClick = () => setEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
  const handleCardClick = (cardData) => setSelectedCard(cardData);

  const handleTooltipPopup = (setOpen, message, isMistake) => {
    setPopupMessage(message);
    setIsTooltipPopupOpen(setOpen);
    setIsTooltipMistake(isMistake);
  };
  //открытие попапов

  const [updateUserIsLoading, setUpdateUserIsLoading] = React.useState(false);
  const [updateAvatarIsLoading, setUpdateAvatarIsLoading] =
    React.useState(false);
  const [addCardIsLoading, setAddCardIsLoading] = React.useState(false);

  //закрытие попапов
  const closeAllPopups = () => {
    if (isEditProfilePopupOpen) setEditProfilePopupOpen(false);
    if (isAddPlacePopupOpen) setAddPlacePopupOpen(false);
    if (isEditAvatarPopupOpen) setEditAvatarPopupOpen(false);
    if (selectedCard) {
      setSelectedCard(null);
    }
    if (isSubmitDeletePopupOpen) setSubmitDeletePopupOpen(false);

    if (isTooltipPopupOpen) {
      setIsTooltipPopupOpen(false);
      setIsTooltipMistake(false);
    }
  };

  const [cardToDelete, setCardToDelete] = React.useState({});

  const [currentUser, setCurrentState] = React.useState({
    name: "Загрузка...",
    about: "Загрузка...",
    avatar: "",
    currentUserId: "",
  });

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const history = useHistory();

  function signOut() {
    localStorage.removeItem("token");

    setIsLoggedIn(false);

    setUserEmail("");

    history.push("/signin");
  }

  React.useEffect(() => {
    if (isLoggedIn){
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cardsData]) => {
        setCurrentState({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          currentUserId: user._id,
        });

        setCards(cardsData);
      })
      .catch((err) => console.log(err));
    }    
  }, [isLoggedIn]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");    

    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          setUserEmail(res.data.email);

          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((errorStatus) => {
          handleTooltipPopup(true, "Недействительный токен JWT", true);

          localStorage.removeItem("token");
          setIsLoggedIn(false);

          history.push("/signin");
        });
    }
  }, []);

  function handleUpdateUser({ name, about }) {
    setUpdateUserIsLoading(true);

    api
      .editUserInfo({
        newName: name,
        newAbout: about,
      })
      .then((user) => {
        setCurrentState({ ...currentUser, name: user.name, about: user.about });

        closeAllPopups();

        setUpdateUserIsLoading(false);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ url, formCleaner }) {
    setUpdateAvatarIsLoading(true);

    api
      .changeAvatar({
        newAvatarLink: url,
      })
      .then((user) => {
        setCurrentState({
          ...currentUser,
          avatar: user.avatar,
        });

        closeAllPopups();

        formCleaner();

        setUpdateAvatarIsLoading(false);
      })
      .catch((err) => console.log(err));
  }

  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (liker) => liker._id === currentUser.currentUserId
    );

    api
      .toggleApiLike({ cardId: card._id, isSetLike: !isLiked })
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(cardToDelete) {
    setSubmitDeletePopupOpen(true);
    setCardToDelete(cardToDelete);
  }

  function handleSubmitCardDelete() {
    api
      .deleteCard({ cardId: cardToDelete._id })
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardToDelete._id));
        setCardToDelete({});
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ description, url, formCleaner }) {
    setAddCardIsLoading(true);

    api
      .addNewCard({ cardName: description, cardLink: url })
      .then((newCard) => {
        setCards([newCard, ...cards]);

        closeAllPopups();

        formCleaner();

        setAddCardIsLoading(false);
      })
      .catch((err) => console.log(err));
  }

  function handleLogin(token, userEmail) {    
    setIsLoggedIn(true);
    localStorage.setItem("token", token);

    setUserEmail(userEmail);
  }

  function autorize(userEmail, userPassword) {
    auth
      .authorize(userEmail, userPassword)
      .then((data) => {        
        if (data.token) {
          handleLogin(data.token, userEmail);
          history.push("/");
        }
      })
      .catch((errorStatus) => {
        handleTooltipPopup(
          true,
          errorStatus === 401
            ? "Пользователь с email не найден! Пройдите регистрацию"
            : errorStatus === 400
            ? "Не передано одно из полей. Заполните оба поля"
            : "Что-то пошло не так",
          true
        );
      });
  }

  function register(userEmail, userPassword) {
    auth
      .register(userEmail, userPassword)
      .then((res) => {
        handleTooltipPopup(true, "Вы успешно зарегистрировались!", false);
        history.push("/signin");
      })
      .catch((err) => {
        handleTooltipPopup(
          true,
          "Что-то пошло не так! Попробуйте ещё раз.",
          true
        );
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header userEmail={userEmail} signOut={signOut} />
          <Switch>
            <Route path="/signin">
              <Login autorize={autorize} />
            </Route>

            <Route path="/signup">
              <Register register={register} />
            </Route>

            <ProtectedRoute
              path="/"
              isLoggedIn={isLoggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              component={Main}
            />
          </Switch>
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          formName={"edit-profile"}
          isLoading={updateUserIsLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          formName={"add-card"}
          isLoading={addCardIsLoading}
        />

        <SubmitDeletePopup
          isOpen={isSubmitDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmitDeleteCard={handleSubmitCardDelete}
        />

        <InfoTooltip
          isOpen={isTooltipPopupOpen}
          message={popupMessage}
          onClose={closeAllPopups}
          isTooltipMistake={isTooltipMistake}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          formName={"update-avatar"}
          isLoading={updateAvatarIsLoading}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
