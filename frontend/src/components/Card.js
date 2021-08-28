import React from "react";
import Button from "./Button.js";
import { CurrentUserContext } from "./../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUserContext = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.cardData);
  }

  function handleLikeClick() {
    props.onCardLike(props.cardData);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.cardData);
  }

  const currentUserId = currentUserContext.currentUserId;

  const isOwn = props.cardData.owner._id === currentUserId;
  const isLiked = props.cardData.likes.some(
    (liker) => liker._id === currentUserId
  );

  const cardDeleteButtonClassName = `button button_type_delete-card ${
    isOwn ? "" : "button_hidden"
  }`;

  const cardLikeButtonClassName = `card__heart ${
    isLiked ? "card__heart_active" : ""
  }`;

  return (
    <li className="card">
      <div
        style={{ backgroundImage: `url(${props.cardData.link})` }}
        className="card__image"
        onClick={handleClick}
      ></div>
      <div className="card__sign">
        <h2 className="card__description">{props.cardData.name}</h2>
        <div className="card__heart-container">
          <Button
            type="button"
            className={cardLikeButtonClassName}
            ariaLabel="Иконка лайка"
            onClick={handleLikeClick}
          ></Button>
          <span className="card__heart-voices">
            {props.cardData.likes.length}
          </span>
        </div>
      </div>
      <Button
        type="button"
        ariaLabel="Кнопка удаления карточки"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></Button>
    </li>
  );
}

export default Card;
