import React from "react";
import Card from "./Card.js";
import Button from "./Button.js";
import Footer from "./Footer.js";
import { CurrentUserContext } from "./../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUserContext = React.useContext(CurrentUserContext);

  const [isButtonChangeAvatarVisible, setCssButtonEditAvatarStyles] =
    React.useState(false);

  function makeButtonChangeAvatarProfileVisible() {
    setCssButtonEditAvatarStyles(true);
  }

  function makeButtonChangeAvatarProfileUnvisible() {
    setCssButtonEditAvatarStyles(false);
  }

  const cssEditAvatarButton = { opacity: 1 };

  return (
    <>
      <main className="main page__container-item page__container-item_stretch_narrow">
        <section className="profile">
          <div className="profile__avatar-container">
            <div className="profile__avatar-box">
              <div
                style={{ backgroundImage: `url(${currentUserContext.avatar})` }}
                className="profile__avatar"
              ></div>
              <Button
                type="button"
                className="button button_type_change-avatar"
                ariaLabel="Кнопка редактирования аватара"
                onMouseEnter={makeButtonChangeAvatarProfileVisible}
                onMouseLeave={makeButtonChangeAvatarProfileUnvisible}
                onClick={props.onEditAvatar}
                style={isButtonChangeAvatarVisible ? cssEditAvatarButton : null}
              ></Button>
            </div>
            <div className="profile__info">
              <h1 className="profile__name">{currentUserContext.name}</h1>
              <Button
                type="button"
                className="button button_type_edit-profile"
                ariaLabel="Кнопка редактирования профиля"
                onClick={props.onEditProfile}
              ></Button>
              <p className="profile__description">{currentUserContext.about}</p>
            </div>
          </div>
          <Button
            type="button"
            className="button button_type_add-element"
            ariaLabel="Кнопка добавления элемента"
            onClick={props.onAddPlace}
          ></Button>
        </section>
        <section className="cards">
          <ul className="cards__list">
            {props.cards.map((card) => {
              return (
                <Card
                  key={card._id}
                  cardData={card}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                />
              );
            })}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
