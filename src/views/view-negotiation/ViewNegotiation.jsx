import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../components/Button.jsx";
import Icon from "../../components/Icon.jsx";

const ViewNegotiation = () => {
  const [negotiationData, setNegotiationData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [userRole, setUserRole] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showMessageHistory, setShowMessageHistory] = useState(false);
  const [saveMessages, setSaveMessages] = useState("");
  const [messages, setMessages] = useState([]);
  const [offerAmount, setOfferAmount] = useState("");

  const { id } = useParams();
  const { auth, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNegotiationData();
  }, []);

  const fetchNegotiationData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/negotiations/${id}`
      );
      const negotiation = response.data;
      setNegotiationData(negotiation);

      // Determine the user's role in the negotiation
      const userId = auth.user.sub;
      const creatorId = negotiation.creatorId;
      const isCreator = userId === creatorId;

      setUserRole(isCreator ? "negotiation-creator" : "other");
    } catch (error) {
      console.error("Erro ao buscar negociação:", error);
    }
  };

  // Function to toggle showing/hiding the negotiation description
  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  // Function to toggle showing/hiding the dropdown menu
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Function to handle clicking "View Details" button
  const handleViewDetailsClick = () => {
    setShowDescription(true);
    toggleDescription();
    console.log("Detalhes da negociação:", negotiationData);
  };

  // Function to handle clicking "Send Message" button
  const handleSendMessageClick = () => {
    toggleDropdown();
    setShowChat(true);
  };

  // Function to save a chat message
  const saveMessage = async (message) => {
    try {
      const messageData = {
        sender: user,
        message: message,
      };

      // Send the message to the server
      await axios.post(`http://localhost:3000/messages`, messageData);

      console.log("Mensagem enviada com sucesso!");

      // Load messages from the server
      loadMessagesFromServer();
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  // Function to load chat messages from the server
  const loadMessagesFromServer = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/messages`);
      const storedMessages = response.data;

      // Set the messages state with fetched messages
      setMessages(storedMessages);
      console.log("Mensagens carregadas do servidor:", storedMessages);
    } catch (error) {
      console.error("Erro ao carregar mensagens do servidor:", error);
    }
  };

  useEffect(() => {
    // Fetch negotiation data and load messages when the component mounts
    fetchNegotiationData();
    loadMessagesFromServer();
  }, []);

  // Function to handle clicking "Send Offer" button
  const handleSendOfferClick = async () => {
    try {
      const offerData = {
        userId: auth.user.sub,
        negotiationId: id,
        amount: offerAmount,
      };

      // Send the offer data to the server
      await axios.post(`http://localhost:3000/offers`, offerData);

      console.log("Oferta enviada com sucesso!");

      fetchNegotiationData();
    } catch (error) {
      console.error("Erro ao fazer oferta:", error);
    }
  };

  const handleTrackOfferStatusClick = () => {
    navigate(`/track-offer-status/${id}`);
  };

  const handleSendClick = (message) => {
    saveMessage(message);

    navigate(`/my-negotiations/${id}`);
    setShowChat(false);
  };

  const handleViewMessagesClick = () => {
    loadMessagesFromServer();
    toggleDropdown();

    // Toggle showing/hiding the message history
    if (!showMessageHistory) {
      setShowMessageHistory(true);
    } else {
      setShowMessageHistory(false);
    }
  };

  // Function to handle clicking "Track Delivery Status" button
  const handleTrackDeliveryStatusClick = () => {
    navigate(`/track-delivery-status/${id}`);
  };

  return (
    <div className="mktp-view-negotiation">
      <div className="mktp-view-negotiation__box">
        <h2>Detalhes da Negociação</h2>
        <p>
          Título: <em>{negotiationData.title}</em>
        </p>

        <p>
          Descrição: {showDescription && <em>{negotiationData.description}</em>}
        </p>

        <p>
          Preço: <em>{negotiationData.price}</em>
        </p>

        {userRole === "negotiation-creator" && (
          <>
            <div className="mktp-view-negotiation__box__title">
              <h3>Ações do Criador</h3>
              <Icon
                className="pointer"
                fill={"#000"}
                size={"40"}
                typeIcon={"dropdown"}
                onClick={toggleDropdown}
              />
            </div>
            <div className="mktp-view-negotiation__box__menu">
              {showDropdown && (
                <div className="mktp-view-negotiation__box__menu__dropdown">
                  <ul>
                    <li>
                      <Button
                        type="primary"
                        text="Ver Detalhes"
                        onClick={handleViewDetailsClick}
                      />
                    </li>
                    <li>
                      <Button
                        type="secondary"
                        text="Ver e Responder Mensagens"
                        onClick={handleViewMessagesClick}
                      />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        )}

        {userRole !== "other" && (
          <>
            {!showChat && (
              <div className="mktp-view-negotiation__box__title">
                <h3>Ações dos Outros Usuários</h3>
                <Icon
                  className="pointer"
                  fill={"#000"}
                  size={"40"}
                  typeIcon={"dropdown"}
                  onClick={toggleDropdown}
                />
              </div>
            )}

            {showChat && (
              <div
                className={`mktp-view-negotiation__box__title ${
                  showChat && "d-grid"
                }`}
              >
                <div className="mktp-view-negotiation__box__title__wrapper d-flex">
                  <h3>Chat</h3>
                </div>
                <div className="mktp-view-negotiation__box__title__new-message">
                  <label>Insira sua mensagem:</label>
                  <textarea
                    type="text"
                    value={saveMessages}
                    onChange={(e) => setSaveMessages(e.target.value)}
                  />
                </div>
                <Button
                  type="primary"
                  text="Enviar"
                  onClick={() => handleSendClick(saveMessages)}
                />
              </div>
            )}

            <div className="mktp-view-negotiation__box__menu">
              {showDropdown && (
                <div className="mktp-view-negotiation__box__menu__dropdown">
                  <ul>
                    <li>
                      <Button
                        type="secondary"
                        text="Ver os detalhes da negociação"
                        onClick={handleViewDetailsClick}
                        onChange={(e) => setOfferAmount(e.target.value)}
                      />
                    </li>
                    <li>
                      <Button
                        type="primary"
                        action="submit"
                        text="Enviar Mensagem"
                        onClick={handleSendMessageClick}
                      />
                    </li>
                    <li>
                      <Button
                        type="secondary"
                        text="Ver Histórico de Mensagens"
                        onClick={handleViewMessagesClick}
                      />
                    </li>
                    <li>
                      <Button
                        type="primary"
                        action="submit"
                        text="Enviar Oferta"
                        onClick={handleSendOfferClick}
                      />
                    </li>
                    <li>
                      <Button
                        type="secondary"
                        text="Acompanhar Status da Oferta"
                        onClick={handleTrackOfferStatusClick}
                      />
                    </li>
                    <li>
                      <Button
                        type="primary"
                        text="Acompanhar Status da Entrega"
                        onClick={handleTrackDeliveryStatusClick}
                      />
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {messages.length > 0 && showMessageHistory && (
              <>
                <div className="separator">
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
                <div className="message-history">
                  <h3>Histórico de Mensagens</h3>
                  <ul>
                    {messages.map((message, index) => (
                      <li key={index} className="mb-2">
                        <strong>Remetente:</strong> {message.sender}
                        <br />
                        <strong>Mensagem:</strong> {message.message}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewNegotiation;
