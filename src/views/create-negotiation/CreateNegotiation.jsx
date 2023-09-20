import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Button from "../../components/Button";

const CreateNegotiation = ({ userId, userEmail }) => {
  // Initialize state to store negotiation data
  const [negotiationData, setNegotiationData] = useState({
    title: "",
    description: "",
    price: "",
    latitude: null,
    longitude: null,
  });

  const navigateTo = useNavigate();

  // Handle the Enter key press event in the price input field
  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSaveNegotiation();
    }
  };

  // Use useEffect to fetch the user's geolocation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Update the latitude and longitude in state
          setNegotiationData({
            ...negotiationData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          toast.error("Erro ao obter localização");
        }
      );
    } else {
      toast.warn("Geolocalização não suportada no navegador.");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNegotiationData({
      ...negotiationData,
      [name]: value,
    });
  };

  // Handle the save negotiation event
  const handleSaveNegotiation = async () => {
    try {
      // Prepare the data for the POST request
      const data = {
        ...negotiationData,
        creatorId: userId,
        creatorEmail: userEmail,
      };

      // Send a POST request to create a new negotiation
      const response = await axios.post(
        "http://localhost:3000/negotiations",
        data
      );

      // Check the response status and navigate accordingly
      if (response.status === 201) {
        toast.success("Negociação criada com sucesso!");
        navigateTo(`/my-negotiations/${response.data.id}`);
      } else {
        toast.error("Erro ao criar a negociação. Tente novamente mais tarde.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar a negociação. Tente novamente mais tarde.");
    }
  };

  return (
    <div className={`mktp-create-negotiation`}>
      <div className="mktp-create-negotiation">
        <div className="mktp-create-negotiation__box">
          <h4>Criar Negociação</h4>
          <form>
            <div className="mktp-create-negotiation__wrapper">
              <label>Título:</label>
              <input
                type="text"
                name="title"
                value={negotiationData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="mktp-create-negotiation__wrapper">
              <label>Descrição:</label>
              <textarea
                name="description"
                value={negotiationData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="mktp-create-negotiation__wrapper">
              <label>Preço:</label>
              <input
                type="number"
                name="price"
                value={negotiationData.price}
                onChange={handleInputChange}
                onKeyUp={handleSearchKeyPress}
              />
            </div>
            <div className="mktp-create-negotiation__wrapper">
              <Link to="/">
                <Button type="secondary" text="Voltar" />
              </Link>
              <Button
                type="primary"
                text="Salvar Negociação"
                className="w-auto"
                onClick={handleSaveNegotiation}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

CreateNegotiation.propTypes = {
  userId: PropTypes.number,
  userEmail: PropTypes.number,
  isAuthenticated: PropTypes.bool,
};

export default CreateNegotiation;
