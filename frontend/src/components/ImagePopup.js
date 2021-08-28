import Button from "./Button.js";
import React from "react";

function ImagePopup(props) {

  const isOpen = !!props.card; 

  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        props.onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [props.isOpen, props.onClose]);

  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget && isOpen) {
      props.onClose();
    }
  };

  return (
    <article
      className={`popup popup_type__image ${props.card ? "popup_opened" : ""}`}
    >
      <div className="popup__overlay" onMouseDown={handleOverlayClose}></div>
      <div className="popup__container popup__container_type_image">
        <figure className="figure">
          <img
            src={`${props.card ? props.card.link : "#"}`}
            className="figure__image"
            alt={`${
              props.card ? props.card.name : "Временно отсутствует описание"
            }`}
          />
          <figcaption className="figure__caption">{`${
            props.card ? props.card.name : ""
          }`}</figcaption>
        </figure>

        <Button
          type="button"
          className="button button_type_close-popup"
          ariaLabel="Кнопка закрытия зума"
          onClick={props.onClose}
        ></Button>
      </div>
    </article>
  );
}

export default ImagePopup;
