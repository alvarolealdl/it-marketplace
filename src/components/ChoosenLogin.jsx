import { useState } from "react";
import Button from "../components/Button.jsx";
import Login from "../views/login/Login.jsx";

const ChoosenLogin = () => {
  const [showSimpleLogin, setShowSimpleLogin] = useState(false);
  const [showSsoLogin, setShowSssoLogin] = useState(false);

  return (
    <>
      <div className="mktp-choose-login">
        <div className="container">
          <p className="my-2">
            <b>Escolha abaixo o tipo de Login que você deseja fazer:</b>
          </p>
          <div className="mktp-choose-login__buttons">
            <Button
              type="primary"
              action="submit"
              text="Login Simples"
              onClick={() => {
                setShowSimpleLogin(true);
                setShowSssoLogin(false);
              }}
            />
            <Button
              type="secondary"
              action="submit"
              text="Login SSO"
              onClick={() => {
                setShowSimpleLogin(false);
                setShowSssoLogin(true);
              }}
            />
          </div>
        </div>
      </div>
      {showSimpleLogin && <Login TypeLogin="simple" />}
      {showSsoLogin && <Login TypeLogin="sso" />}
    </>
  );
};

export default ChoosenLogin;
