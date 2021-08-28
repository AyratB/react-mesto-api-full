import { Route, Switch, Link } from "react-router-dom";
import headerLogo from "./../images/header_logo_white.svg";

function Header(props) {
  return (
    <header className="header page__container-item">
      <Link className="header__link" to="#">
        <img src={headerLogo} className="header__logo" alt="Лого" />
      </Link>

      <div>
        <span className="header__email">{props.userEmail}</span>

        <Switch>
          <Route path="/signin">
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
          </Route>

          <Route path="/signup">
            <Link to="/signin" className="header__link">
              Войти
            </Link>
          </Route>

          <Route path="/">
            <Link to="#" className="header__link" onClick={props.signOut}>
              Выйти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
