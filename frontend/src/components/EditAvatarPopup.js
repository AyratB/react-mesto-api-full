import React from "react";

import PopupWithForm from "./PopupWithForm.js";

import { useForm } from "../hooks/useForm";

import { FormValidator } from "./../utils/FormValidator.js";
import { validationConfig } from "./../utils/validationConfig.js";

function EditAvatarPopup(props) {
  const { values, handleChange, clearInputValues } = useForm();

  const [formValidator, setValidator] = React.useState({});

  React.useEffect(() => {
    const editAvatarFormValidator = new FormValidator(
      validationConfig,
      document.forms[props.formName]
    );

    setValidator(Object.assign(formValidator, editAvatarFormValidator));

    editAvatarFormValidator.enableValidation();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      url: values["update-avatar-url"],
      formCleaner: clearInputValues,
    });
  }

  function handleFormClose(e) {
    props.onClose();

    if (formValidator) {
      formValidator.clearAllFormErrors();
      formValidator.makeButtonDisable();
    }

    clearInputValues();
  }

  return (
    <PopupWithForm
      name={props.formName}
      headerText="Обновить аватар"
      buttonSaveText="Сохранить"
      isOpen={props.isOpen}
      onClose={handleFormClose}
      onSubmit={handleSubmit}
    >
      <section className="form__section">
        <input
          type="url"
          className="form__input"
          name="update-avatar-url"
          id="update-avatar-url"
          placeholder="Ссылка на аватар"
          required
          value={values["update-avatar-url"] || ""}
          onChange={handleChange}
        />
        <span className="form__span-error" id="update-avatar-url-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
