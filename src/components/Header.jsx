import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import Icon from "./Icon";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import axios from "axios"; 

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth0();
  const navigateTo = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      try {
        const response = await axios.get(
          `http://localhost:3000/negotiations?query=${encodeURIComponent(
            searchTerm
          )}`
        );console.log(response.status)

        if (response.status === 200) {
          navigateTo(`/?query=${encodeURIComponent(searchTerm)}`);
        } else {
          console.error("Erro ao buscar negociações.");
        }
      } catch (error) {
        console.error("Erro ao buscar negociações:", error);
      }
    }
  };

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    navigateTo(path);
  };

  useEffect(() => {
    const isLoggedInParam = new URLSearchParams(location.search).get(
      "isLoggedIn"
    );
    if (isLoggedInParam === "true") {
      setIsLoggedIn(true);
    }
  }, [location.search]);

  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/create-user"
    ) {
      setSearchTerm("");
    }
  }, [location.pathname]);

  const handleDirectLogout = () => {
    setIsLoggedIn(false);
    navigateTo("/?isLoggedIn=false");
  };

  return (
    <div className="mktp-header">
      <div className="mktp-header__left">
        <div className="mktp-header__left__logo">
          <a href="/" onClick={(e) => handleLinkClick(e, "/")}>
            MERCADO TI
          </a>
        </div>
        {location.pathname !== "/login" &&
          location.pathname !== "/create-user" && (
            <div className="mktp-header__left__search">
              <input
                type="text"
                placeholder="Buscar ofertas"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={handleSearchKeyPress}
              />
              <Button type="primary" text="Buscar" onClick={handleSearch} />
            </div>
          )}
      </div>
      <div className="mktp-header__right">
        {isAuthenticated || isLoggedIn ? (
          <>
            <div className="mktp-header__right__info">
              <Profile />
            </div>
            <div className="mktp-header__right__logout">
              {isAuthenticated && (
                <Button type="logout" text="Logout" onClick={() => logout()} />
              )}

              {isLoggedIn && (
                <Button
                  type="default"
                  text="Logout"
                  onClick={handleDirectLogout}
                />
              )}
            </div>
            <div className="mktp-header__right__menu">
              <Icon
                className="pointer"
                fill={"#fff"}
                size={40}
                typeIcon={"list-dashes"}
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <div className="mktp-header__right__menu__dropdown">
                  <ul>
                    <li>
                      <a
                        href="/create-negotiation"
                        onClick={(e) =>
                          handleLinkClick(e, "/create-negotiation")
                        }
                      >
                        Criar Negociação
                      </a>
                    </li>
                    <li>
                      <a
                        href="/my-negotiations"
                        onClick={(e) => handleLinkClick(e, "/my-negotiations")}
                      >
                        Minhas Negociações
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="mktp-header__right__auth">
            <span>
              Faça&nbsp;
              <a href="/login">LOGIN</a> ou <br />
              crie seu&nbsp;
              <a href="/create-user">CADASTRO</a>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
