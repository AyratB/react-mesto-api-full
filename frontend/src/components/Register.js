import React from "react";
import { withRouter, Link } from "react-router-dom";
import Button from "./Button.js";

function Register(props) {
  const [userName, setUserName] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  const handleChange = (e) => {
    const input = e.target;
    if (input.name === "username") {
      setUserName(input.value);
    } else if (input.name === "password") {
      setUserPassword(input.value);
    }
  };  

  const handleSubmit = (e) => {
    e.preventDefault();

    props.register(userName, userPassword);    
  };

  const cssRules = {
    background: "white",
    color: "black",
  };

  return (
    <div className="login">
      <p className="login__welcome">Регистрация</p>

      <form onSubmit={handleSubmit} className="login__form" name="login">
        <input
          className="login__input"
          id="username"
          name="username"
          value={userName}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="login__input"
          id="password"
          name="password"
          value={userPassword}
          onChange={handleChange}
          placeholder="Пароль"
          type="password"
        />

        <Button
          type="submit"
          className="button button_type_save-form"
          buttonText="Зарегистрироваться"
          style={cssRules}
        ></Button>
      </form>

      <div className="login__signin">
        <span>Уже зарегистрированы?</span>
        <Link to="/sign-in" className="login__link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default withRouter(Register);
