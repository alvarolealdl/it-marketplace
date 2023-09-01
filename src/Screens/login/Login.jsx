import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button.jsx";
import Icon from "../../components/Icon.jsx";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorFixed, setIsErrorFixed] = useState(false);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const errorRef = useRef(null);
  const navigateTo = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      scrollToMsg();
    }
  }, [errorMessage]);

  const scrollToMsg = () => {
    if (errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setTimeout(() => {
      setErrorMessage("");
      setIsErrorFixed(false);
    }, 5000);

    if (isErrorFixed) {
      setIsErrorFixed(true);
    }

    setIsErrorFixed(true);
    if (errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const userName = usernameRef.current.value.toLowerCase();
    const userPassword = passwordRef.current.value;

    try {
      const response = await axios.get("http://localhost:3000/users");
      const users = response.data;

      const foundUser = users.find(
        (user) =>
          user.username.toLowerCase() === userName.toLowerCase() &&
          user.password === userPassword
      );

      if (!userName || !userPassword) {
        setErrorMessage("Por favor, preencha todos os campos");
        return;
      }

      if (foundUser) {
        setErrorMessage("");
        setUsername("");
        setPassword("");
        return navigateTo("/home");
      } else {
        setErrorMessage("Usuário ou senha inválidos");
      }
    } catch (error) {
      setErrorMessage(
        "Erro ao fazer login. Por favor, tente novamente mais tarde"
      );
    }
  };

  return (
    <div className="mktp-login">
      {errorMessage && (
        <div className={"error-message"} ref={errorRef}>
          {errorMessage}
        </div>
      )}

      <div className="mktp-login__info">
        <h1>Bem vindo ao Mercado TI</h1>
        <h4>
          Soluções em periféricos e gadgets para profissionais freelancer da
          área de tecnologia
        </h4>
      </div>
      <div className="mktp-login__box">
        <h4>Login</h4>
        <form onSubmit={handleSubmit}>
          <div className="mktp-login__box__wrapper">
            <label>Usuário:</label>
            <input
              type="text"
              id="username"
              maxLength={30}
              onChange={handleUsernameChange}
              ref={usernameRef}
              value={username}
            />
          </div>
          <div className="mktp-login__box__wrapper">
            <label>Senha:</label>
            <input
              autoComplete="current-password"
              id="password"
              name="password"
              onChange={handlePasswordChange}
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              value={password}
            />
            <Icon
              className="login-icon"
              typeIcon={showPassword ? "visible-password" : "hidden-password"}
              onClick={handleShowPassword}
            />
          </div>
          <Button type="primary" action="submit" text="Entrar" />
          <div className="separator">
            <div className="line"></div>
            <p>ou</p>
            <div className="line"></div>
          </div>
          <Link to="/create-user" className="create-account">
            <Button type="secondary" text="Criar novo usuário" />
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
