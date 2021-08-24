import React from "react";
import Button from "./Button.js";

import tooltipLogoCheck from "./../images/tooltip-check.svg";
import tooltipLogoMistake from "./../images/tooltip-mistake.svg";

function InfoTooltip(props) {
  return (
    <article className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__overlay"></div>
      <div className="popup__container popup__container_type_tooltip">
        <img
          src={props.isTooltipMistake ? tooltipLogoMistake : tooltipLogoCheck}
          className="tooltip__logo"
          alt="Лого"
        />

        <h2 className="tooltip__title">{props.message}</h2>

        <Button
          type="button"
          className="button button_type_close-popup"
          ariaLabel="Кнопка закрытия попапа"
          onClick={props.onClose}
        ></Button>
      </div>
    </article>
  );
}

export default InfoTooltip;
