import PropTypes from "prop-types";

const Card = ({ title, description, onClick }) => (
  <div className="mktp-homepage__grid-container__card">
    <h3 className="mktp-homepage__grid-container__card__title">{title}</h3>
    <p className="mktp-homepage__grid-container__card__description">
      {description}
    </p>
    <button
      className="mktp-homepage__grid-container__card__btn"
      onClick={onClick}
    >
      Entrar
    </button>
  </div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
