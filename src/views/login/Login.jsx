import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";
import Button from "../../components/Button.jsx";
import Icon from "../../components/Icon.jsx";

const Login = ({ TypeLogin, isAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isErrorFixed, setIsErrorFixed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigateTo = useNavigate();

  console.log("ISAUTH:", isAuthenticated);

  useEffect(() => {
    const dados = localStorage.setItem("authentication", "true");
    if (dados === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  console.log(isLoggedIn);
  // Check if the user was previously logged in
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to toggle login status and store it in local storage
  const toggleLogin = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isErrorFixed) {
      setIsErrorFixed(true);
    }

    const userName = usernameRef.current.value.toLowerCase();
    const userPassword = passwordRef.current.value;

    try {
      const response = await axios.get("http://localhost:3000/users");
      const users = response.data;

      // Find user in the database
      const foundUser = users.find(
        (user) =>
          user.username.toLowerCase() === userName.toLowerCase() &&
          user.password === userPassword
      );

      if (!userName || !userPassword) {
        toast.warn("Por favor, preencha todos os campos");
        return;
      }
      if (foundUser) {
        localStorage.setItem("user", JSON.stringify(foundUser));
        localStorage.setItem("authentication", "true");
        setUsername("");
        setPassword("");
        toggleLogin(true);
        navigateTo("/?isLoggedIn=true");
      } else {
        toast.warn("Usuário ou senha inválidos");
      }
    } catch (error) {
      toast.error("Erro ao fazer login. Por favor, tente novamente mais tarde");
    }
  };

  return (
    <div className={`mktp-login`}>
      <div className="mktp-login">
        <div className="mktp-login__info">
          <h1>Bem vindo ao Mercado TI</h1>
          <h4>
            Soluções em periféricos e gadgets para profissionais freelancer da
            área de tecnologia
          </h4>
        </div>
        <div className={`mktp-login__box ${TypeLogin === "sso" && "d-grid"}`}>
          <h4>
            Login
            {TypeLogin === "simple"
              ? " simples"
              : TypeLogin === "sso"
              ? " com SSO"
              : ""}
          </h4>
          <form onSubmit={handleSubmit}>
            {TypeLogin === "simple" && (
              <>
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
                    typeIcon={
                      showPassword ? "visible-password" : "hidden-password"
                    }
                    onClick={handleShowPassword}
                  />
                </div>
              </>
            )}
            <div className="mktp-login__box__wrapper">
              <Button
                type={
                  TypeLogin === "simple"
                    ? "primary"
                    : TypeLogin === "sso"
                    ? "login"
                    : ""
                }
                action={
                  TypeLogin === "simple"
                    ? "submit"
                    : TypeLogin === "sso"
                    ? ""
                    : ""
                }
                text={
                  TypeLogin === "simple"
                    ? "Entrar"
                    : TypeLogin === "sso"
                    ? "Fazer Login"
                    : ""
                }
              />
              {TypeLogin === "simple" && (
                <>
                  <div className="separator">
                    <div className="line"></div>
                    <p>ou</p>
                    <div className="line"></div>
                  </div>
                  <Link to="/create-user" className="create-account">
                    <Button type="secondary" text="Criar novo usuário" />
                  </Link>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  TypeLogin: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  toggleTheme: PropTypes.func,
  theme: PropTypes.string,
};

export default Login;
