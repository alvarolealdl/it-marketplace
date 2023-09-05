import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button.jsx";

const MyNegotiations = () => {
  const [negotiations, setNegotiations] = useState([]);
  const [userOffers, setUserOffers] = useState([]);
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  // Function to fetch user's negotiations and offers
  const fetchUserNegotiations = async () => {
    try {
      let userEmail;

      // Check if the user is authenticated
      if (isAuthenticated) {
        userEmail = user.email;
      } else {
        userEmail = "guest@example.com";
      }

      // Fetch negotiations associated with the user's email
      const response = await axios.get(
        `http://localhost:3000/negotiations?userEmail=${userEmail}`
      );

      // Set the negotiations state with the fetched data
      setNegotiations(response.data);

      const offersResponse = await axios.get(
        `http://localhost:3000/offers?userEmail=${userEmail}`
      );

      // Set the userOffers state with the fetched data
      const userOffers = offersResponse.data;

      setUserOffers(userOffers);
    } catch (error) {
      console.error("Erro ao buscar negociações e ofertas do usuário:", error);
    }
  };

  // Function to check if the user has an offer for a negotiation
  const hasUserOffer = (negotiationId) => {
    return userOffers.some((offer) => offer.negotiationId === negotiationId);
  };

  // Handle clicking the "Edit Offer" button
  const handleEditOfferClick = (negotiationId) => {
    navigate(`/edit-offer/${negotiationId}`);
  };

  // Use useEffect to fetch user's negotiations when authentication status changes
  useEffect(() => {
    fetchUserNegotiations();
  }, [isAuthenticated]);

  return (
    <div className="mktp-my-negotiations">
      <h2>Minhas Negociações</h2>
      <ul>
        {negotiations.map((negotiation) => (
          <li key={negotiation.id}>
            <p>Título: {negotiation.title}</p>
            <p>Descrição: {negotiation.description}</p>
            <p>Preço: {negotiation.price}</p>
            {isAuthenticated && hasUserOffer(negotiation.id) && (
              <Button
                type="primary"
                text="Editar Oferta"
                onClick={() => handleEditOfferClick(negotiation.id)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyNegotiations;
