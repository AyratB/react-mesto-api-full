import Button from "./Button.js";
import React from "react";

function PopupWithForm(props) {

  React.useEffect(() => {
    if (!props.isOpen) return;
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
    if (event.target === event.currentTarget && props.isOpen) {
      props.onClose();
    }
  };

  return (
    <article
      className={`popup ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__overlay" onMouseDown={handleOverlayClose}></div>
      <div className="popup__container">
        <h2 className="popup__title">{props.headerText}</h2>
        <form
          className="form"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <Button
            type="submit"
            className="button button_type_save-form"
            buttonText={props.isLoading ? "Сохранение..." : props.buttonSaveText}
          ></Button>
        </form>
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

export default PopupWithForm;
