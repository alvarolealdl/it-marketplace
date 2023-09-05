import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

const Button = ({ type, action, onClick, className, text, children }) => {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <>
      {type === "primary" && (
        <button
          type={action ? action : "button"}
          className={`mktp-btn-primary ${className ? className : ""}`}
          onClick={onClick}
        >
          {text} {children}
        </button>
      )}

      {type === "secondary" && (
        <button
          type={action ? action : "button"}
          className={`mktp-btn-secondary ${className ? className : ""}`}
          onClick={onClick}
        >
          {text} {children}
        </button>
      )}

      {type === "default" && (
        <button
          type={action ? action : "button"}
          className={`mktp-btn-default ${className ? className : ""}`}
          onClick={onClick}
        >
          {text} {children}
        </button>
      )}

      {type === "login" && (
        <button
          type={action ? action : "button"}
          className={`mktp-btn-primary ${className ? className : ""}`}
          onClick={() => loginWithRedirect()}
        >
          {text} {children}
        </button>
      )}

      {type === "logout" && (
        <button
          type={action ? action : "button"}
          className={`mktp-btn-default ${className ? className : ""}`}
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          {text} {children}
        </button>
      )}
    </>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  action: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.string,
};

export default Button;
