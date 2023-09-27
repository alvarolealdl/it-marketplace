import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ChoosenLogin from "../src/components/ChoosenLogin.jsx";
import Login from "./views/login/Login.jsx";
import CreateUser from "../src/views/create-user/CreateUser.jsx";
import Home from "./views/homepage/Home.jsx";
import Header from "../src/components/Header.jsx";
import CreateNegotiation from "./views/create-negotiation/CreateNegotiation.jsx";
import MyNegotiations from "./views/my-negotiations/MyNegotiations.jsx";
import ViewNegotiation from "./views/view-negotiation/ViewNegotiation.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "./components/Footer.jsx";

const MarketplaceRouter = () => {
  const { user, isAuthenticated } = useAuth0();
  const [theme, setTheme] = useState("-light");
  const [searchValueResult, setSearchValueResult] = useState("");
  const location = useLocation();
  const normalUser = location.state && location.state.foundUser;

  // Switch theme function
  const toggleTheme = () => {
    if (theme === "-light") {
      setTheme("-dark");
      // Save the user's choice in localStorage
      localStorage.setItem("theme", "-dark");
    } else {
      setTheme("-light");
      localStorage.setItem("theme", "-light");
    }
  };

  // Effect to load the theme saved in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const searchValue = (valor) => {
    setSearchValueResult(valor);
  };

  return (
    <div className={`mktp-container${theme}`}>
      <div className="mktp-content">
        <Header
          toggleTheme={toggleTheme}
          theme={theme}
          searchValue={searchValue}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home foundUser={normalUser} searchValue={searchValueResult} />
            }
          />
          <Route path="/login" element={<ChoosenLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route
            path="/create-negotiation"
            element={
              <CreateNegotiation
                userId={
                  isAuthenticated ? user : normalUser ? normalUser.username : ""
                }
                userEmail={
                  isAuthenticated
                    ? user.email
                    : normalUser
                    ? normalUser.email
                    : ""
                }
              />
            }
          />
          <Route
            path="/negotiation/:negotiationId"
            element={<ViewNegotiation theme={theme} />}
          />

          <Route path="/my-negotiations/" element={<MyNegotiations />} />
          <Route
            path="/my-negotiations/:id"
            element={<ViewNegotiation theme={theme} />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default MarketplaceRouter;
