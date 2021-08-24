import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "./../contexts/CurrentUserContext.js";

import { FormValidator } from "./../utils/FormValidator.js";
import { validationConfig } from "./../utils/validationConfig.js";

import { useForm } from "../hooks/useForm";

function EditProfilePopup(props) {

  const { values, handleChange, setValues } = useForm();
  
  const [isFormWasClosedWithoutSaving, setIsFormWasClosedWithoutSaving] =
    React.useState(false);

  const [formValidator, setValidator] = React.useState({});

  const currentUser = React.useContext(CurrentUserContext);

  if (
    props.isOpen &&
    isFormWasClosedWithoutSaving &&
    (currentUser.name !== values["edit-profile-name"] || currentUser.about !== values["edit-profile-description"])
  ) {
    
    setUserParams();

    setIsFormWasClosedWithoutSaving(false);    
  }

  React.useEffect(() => {

    let editProfileFormValidator = new FormValidator(
      validationConfig,
      document.forms[props.formName]
    );

    setValidator(Object.assign(formValidator, editProfileFormValidator));    

    editProfileFormValidator.enableValidation();     
  }, []);

  React.useEffect(() => {

    setUserParams();

  }, [currentUser, props.isOpen]);


  function setUserParams(){
    setValues({
      "edit-profile-name": currentUser.name,
      "edit-profile-description": currentUser.about
    });
  }

  function handleFormClose() {
    if (currentUser.name !== values["edit-profile-name"] || currentUser.about !== values["edit-profile-description"]) {
      setIsFormWasClosedWithoutSaving(true);
    }

    props.onClose();

    if (formValidator) {
      formValidator.clearAllFormErrors();
      formValidator.makeButtonDisable();
    }    
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: values["edit-profile-name"],
      about: values["edit-profile-description"],
    });
  }

  return (
    <PopupWithForm
      name={props.formName}
      headerText="Редактировать профиль"
      buttonSaveText="Сохранить"
      isOpen={props.isOpen}
      onClose={handleFormClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <section className="form__section">
        <input
          type="text"
          className="form__input"
          name="edit-profile-name"
          id="edit-profile-name"
          required
          minLength="2"
          maxLength="40"
          value={values["edit-profile-name"] || ""}
          onChange={handleChange}
        />
        <span className="form__span-error" id="edit-profile-name-error"></span>
      </section>
      <section className="form__section">
        <input
          type="text"
          className="form__input"
          name="edit-profile-description"
          id="edit-profile-description"
          required
          minLength="2"
          maxLength="200"
          value={values["edit-profile-description"] || ""}
          onChange={handleChange}
        />
        <span
          className="form__span-error"
          id="edit-profile-description-error"
        ></span>
      </section>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
