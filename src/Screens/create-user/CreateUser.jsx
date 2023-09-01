import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button.jsx";
import Icon from "../../components/Icon.jsx";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isErrorFixed, setIsErrorFixed] = useState(false);
  const confirmPasswordRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const msgRef = useRef(null);
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

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const checkUsernameAvailability = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users?username=${username}`
      );

      if (response.data.length > 0) {
        setErrorMessage("O nome de usuário já está em uso");
        return false;
      } else {
        return true;
      }
    } catch (error) {
      setErrorMessage("Erro ao verificar disponibilidade do nome de usuário");
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
      setIsErrorFixed(false);
    }, 5000);

    if (isErrorFixed) {
      setIsErrorFixed(true);
    }

    const userEmail = usernameRef.current.value;
    const userPassword = passwordRef.current.value;
    const userConfirmPassword = confirmPasswordRef.current.value;

    if (!userEmail || !userPassword || !userConfirmPassword) {
      setErrorMessage("Por favor, preencha todos os campos");
      return;
    }

    if (userPassword !== userConfirmPassword) {
      setErrorMessage("As senhas devem ser iguais");
      return;
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/;

    if (!passwordRegex.test(userPassword)) {
      setErrorMessage(
        "A senha deve conter pelo menos um número, um caractere especial e uma letra maiúscula"
      );
      return;
    }

    if (userPassword.length > 50) {
      setErrorMessage("A senha deve ter no máximo 50 caracteres!");
      return;
    }

    if (userPassword.length < 5) {
      setErrorMessage("A senha deve ter pelo menos 5 caracteres!");
      return;
    }

    const isUsernameAvailable = await checkUsernameAvailability();

    if (!isUsernameAvailable) {
      scrollToMsg();
      return;
    }

    try {
      const userObject = {
        username: username,
        password: password,
      };

      const response = await axios.post(
        "http://localhost:3000/users",
        userObject
      );

      if (response.status === 201) {
        setSuccessMessage("Usuário criado com sucesso");

        setTimeout(() => {
          navigateTo("/");
        }, 2000);
      } else {
        setErrorMessage("Erro ao criar usuário. Verifique suas informações");
      }
    } catch (error) {
      setErrorMessage("Erro ao criar usuário. Verifique suas informações");
    }
  };

  useEffect(() => {
    if (errorMessage || successMessage) {
      scrollToMsg();
    }
  }, [errorMessage, successMessage]);

  const scrollToMsg = () => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="mktp-create-user">
      <div className="mktp-create-user__box">
        {errorMessage && (
          <div className="error-message" ref={msgRef}>
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="success-message" ref={msgRef}>
            {successMessage}
          </div>
        )}

        <h4>Criar Usuário</h4>
        <form onSubmit={handleSubmit}>
          <div className="mktp-create-user__box__wrapper">
            <label htmlFor="username">Usuário:</label>
            <input
              id="username"
              maxLength={30}
              onChange={handleUsernameChange}
              ref={usernameRef}
              type="text"
              value={username}
            />
          </div>
          <div className="mktp-create-user__box__wrapper">
            <label htmlFor="password">Senha:</label>
            <input
              id="password"
              name="password"
              onChange={handlePasswordChange}
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              value={password}
            />
            <Icon
              className="mktp-create-user__box__wrapper__icon"
              onClick={handleShowPassword}
              typeIcon={showPassword ? "visible-password" : "hidden-password"}
            />
          </div>
          <div className="mktp-create-user__box__wrapper">
            <label htmlFor="confirmPassword">Confirmação Senha:</label>
            <input
              id="confirmPassword"
              onChange={handleConfirmPasswordChange}
              ref={confirmPasswordRef}
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
            />
            <Icon
              className="mktp-create-user__box__wrapper__icon"
              onClick={handleShowConfirmPassword}
              typeIcon={
                showConfirmPassword ? "visible-password" : "hidden-password"
              }
            />
          </div>
          <div className="mktp-create-user__box__wrapper">
            <Link to="/">
              <Button type="secondary" text="Voltar" />
            </Link>
            <Button type="primary" action="submit" text="Criar Usuário" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
