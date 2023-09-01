import PropTypes from "prop-types";

const Button = ({ type, action, onClick, className, text }) => {
  return (
    <>
      {type === "primary" && (
        <button
          type={action ? action : "button"}
          className={`mktp-btn-primary ${className ? className : ""}`}
          onClick={onClick}
        >
          {text}
        </button>
      )}

      {type === "secondary" && (
        <button
          type={action ? action : "button"}
          className={`mktp-btn-secondary ${className ? className : ""}`}
          onClick={onClick}
        >
          {text}
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
};

export default Button;
