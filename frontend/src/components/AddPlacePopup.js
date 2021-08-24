import React from "react";
import PopupWithForm from "./PopupWithForm.js";

import { useForm } from "../hooks/useForm";

import { FormValidator } from "./../utils/FormValidator.js";
import { validationConfig } from "./../utils/validationConfig.js";

function AddPlacePopup(props) {
  const { values, handleChange } = useForm();

  const [formValidator, setValidator] = React.useState({});

  React.useEffect(() => {
    let addCardFormValidator = new FormValidator(
      validationConfig,
      document.forms[props.formName]
    );

    setValidator(Object.assign(formValidator, addCardFormValidator));

    addCardFormValidator.enableValidation();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      description: values["add-card-name"],
      url: values["add-card-url"],
    });
  }

  function handleFormClose() {
    props.onClose();

    if (formValidator) {
      formValidator.clearAllFormErrors();
      formValidator.makeButtonDisable();
    }
  }

  return (
    <PopupWithForm
      name={props.formName}
      headerText="Новое место"
      buttonSaveText="Создать"
      isOpen={props.isOpen}
      onClose={handleFormClose}
      onSubmit={handleSubmit}
    >
      <section className="form__section">
        <input
          type="text"
          className="form__input"
          name="add-card-name"
          id="add-card-name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={values["add-card-name"] || ""}
          onChange={handleChange}
        />
        <span className="form__span-error" id="add-card-name-error"></span>
      </section>
      <section className="form__section">
        <input
          type="url"
          className="form__input"
          name="add-card-url"
          id="add-card-url"
          placeholder="Ссылка на картинку"
          required
          value={values["add-card-url"] || ""}
          onChange={handleChange}
        />
        <span className="form__span-error" id="add-card-url-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
