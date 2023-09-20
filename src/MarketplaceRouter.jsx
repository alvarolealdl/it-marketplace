import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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

const MarketplaceRouter = () => {
  const { user, isAuthenticated } = useAuth0();
  const [theme, setTheme] = useState("-light");

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

  return (
    <div className={`mktp-container${theme}`}>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<ChoosenLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route
          path="/create-negotiation"
          element={
            isAuthenticated ? (
              <CreateNegotiation userId={user} userEmail={user.email} />
            ) : (
              <CreateNegotiation />
            )
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
  );
};

export default MarketplaceRouter;
