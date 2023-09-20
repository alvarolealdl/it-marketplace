import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Button from "../../components/Button.jsx";
import Icon from "../../components/Icon.jsx";

const CreateUser = (isAuthenticated, theme) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isErrorFixed, setIsErrorFixed] = useState(false);
  const confirmPasswordRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigateTo = useNavigate();

  console.log("ISAUTH:", isAuthenticated);

  //Dealing with change of states
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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

  // Set focus on the username input field when the component mounts
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  // Check username availability by making an API request
  const checkUsernameAvailability = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users?username=${username}`
      );

      if (response.data.length > 0) {
        toast.warn("O nome de usuário já está em uso");

        return false;
      } else {
        return true;
      }
    } catch (error) {
      toast.error("Erro ao verificar disponibilidade do nome de usuário");
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isErrorFixed) {
      setIsErrorFixed(true);
    }

    // Get values from the input fields
    const userName = usernameRef.current.value;
    const userEmail = emailRef.current.value;
    const userPassword = passwordRef.current.value;
    const userConfirmPassword = confirmPasswordRef.current.value;

    // Check if any required field is empty
    if (!userName || !userEmail || !userPassword || !userConfirmPassword) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    // Check if passwords match
    if (userPassword !== userConfirmPassword) {
      toast.error("As senhas devem ser iguais");
      return;
    }

    // Check if the email follows the correct format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if the password meets security requirements
    if (!emailRegex.test(userEmail)) {
      toast.error("Preencha um email válido");
      return;
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/;

    if (!passwordRegex.test(userPassword)) {
      toast.warn(
        "A senha deve conter pelo menos um número, um caractere especial e uma letra maiúscula"
      );
      return;
    }

    if (userPassword.length > 50) {
      toast.warn("A senha deve ter no máximo 50 caracteres");
      return;
    }

    if (userPassword.length < 5) {
      toast.warn("A senha deve ter pelo menos 5 caracteres");
      return;
    }

    // Check if the username is available
    const isUsernameAvailable = await checkUsernameAvailability();

    if (!isUsernameAvailable) {
      return;
    }

    // Create user object and send a POST request to create the user
    try {
      const userObject = {
        username: username,
        email: email,
        password: password,
      };

      const response = await axios.post(
        "http://localhost:3000/users",
        userObject
      );

      if (response.status === 201) {
        toast.success("Usuário criado com sucesso");

        setTimeout(() => {
          navigateTo("/");
        }, 2000);
      } else {
        toast.error("Erro ao criar usuário. Verifique suas informações");
      }
    } catch (error) {
      toast.error("Erro ao criar usuário. Verifique suas informações");
    }
  };

  return (
    <div className={`mktp-create-user${theme}`}>
      <div className="mktp-create-user">
        <div className="mktp-create-user__box">
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
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                onChange={handleEmailChange}
                ref={emailRef}
                type="text"
                value={email}
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
              <Link to="/login">
                <Button type="secondary" className="w-auto" text="Voltar" />
              </Link>
              <Button
                type="primary"
                action="submit"
                className="w-auto"
                text="Criar Usuário"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

CreateUser.propTypes = {
  toggleTheme: PropTypes.func,
  theme: PropTypes.string,
};

export default CreateUser;
