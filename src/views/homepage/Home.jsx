import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../components/Card";
import axios from "axios";

const Home = ({ foundUser, searchValue }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [offers, setOffers] = useState([]);
  const navigateTo = useNavigate();

  // Function to fetch the user's location using geolocation API
  useEffect(() => {
    const getUserLocation = () => {
      try {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
              setUserLocation(userLocation);
            },
            (error) => {
              console.error("Erro ao obter a localização do usuário:", error);
              toast.error("Erro ao obter a localização do usuário");
              setUserLocation(null);
            }
          );
        } else {
          console.error("Geolocalização não suportada pelo navegador");
          toast.error("Geolocalização não suportada pelo navegador");
          setUserLocation(null);
        }
      } catch (error) {
        console.error("Erro ao obter a localização do usuário:", error);
        toast.error("Erro ao obter a localização do usuário");
        setUserLocation(null);
      }
    };

    getUserLocation();
  }, []);

  // Function to load offers from an API and sort them by distance
  useEffect(() => {
    const loadOffersFromJSON = async () => {
      try {
        const response = await axios.get("http://localhost:3000/negotiations");

        if (response.status === 200) {
          const allOffers = response.data;

          // Filter offers based on the search value
          const filteredOffers = allOffers.filter((offer) =>
            offer.title.toLowerCase().includes(searchValue.toLowerCase())
          );

          const sortedOffers = filteredOffers.slice(); // Use the filtered offers

          sortedOffers.sort((a, b) => {
            if (!userLocation) {
              return 0;
            }

            const distanceA = calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              a.latitude,
              a.longitude
            );
            const distanceB = calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              b.latitude,
              b.longitude
            );

            return distanceA - distanceB;
          });

          // Select the top 15 offers
          const topFifteenOffers = sortedOffers.slice(0, 15);

          setOffers(topFifteenOffers);
        } else {
          console.error("Erro ao carregar as ofertas do arquivo DB");
          toast.error("Erro ao carregar as ofertas do arquivo DB");
        }
      } catch (error) {
        console.error("Erro ao carregar as ofertas do arquivo DB:", error);
        toast.error("Erro ao carregar as ofertas do arquivo DB");
      }
    };

    loadOffersFromJSON();
  }, [userLocation, searchValue]);

  // Function to calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371;

    const radLat1 = (lat1 * Math.PI) / 180;
    const radLon1 = (lon1 * Math.PI) / 180;
    const radLat2 = (lat2 * Math.PI) / 180;
    const radLon2 = (lon2 * Math.PI) / 180;

    const dLat = radLat2 - radLat1;
    const dLon = radLon2 - radLon1;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    return distance;
  };

  // Function to handle click on offer card and navigate to the offer details
  const handleEnterClick = (offerId) => {
    navigateTo(`/negotiation/${offerId}`, { state: { foundUser } });
  };

  return (
    <div className="container">
      <div className={`mktp-homepage`}>
        <div className="mktp-homepage__grid-container">
          {offers.map((offer) => (
            <Card
              key={offer.id}
              title={offer.title}
              description={offer.description}
              onClick={() => handleEnterClick(offer.id)}
              buttonText="Entrar"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  toggleTheme: PropTypes.func,
  theme: PropTypes.string,
  foundUser: PropTypes.string,
  searchValue: PropTypes.func,
};

export default Home;
