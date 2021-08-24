import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function SubmitDeletePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmitDeleteCard();
  }

  return (
    <PopupWithForm
      name="submit-delete"
      headerText="Вы уверены?"
      buttonSaveText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default SubmitDeletePopup;
