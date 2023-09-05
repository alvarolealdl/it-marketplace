import { Routes, Route } from "react-router-dom";
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
  // Use Auth0 to get user authentication status and user information
  const { user, isAuthenticated } = useAuth0();
  return (
    <div className="mktp-container">
      <Header />
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
          element={<ViewNegotiation />}
        />

        <Route path="/my-negotiations/" element={<MyNegotiations />} />
        <Route path="/my-negotiations/:id" element={<ViewNegotiation />} />
      </Routes>
    </div>
  );
};

export default MarketplaceRouter;
