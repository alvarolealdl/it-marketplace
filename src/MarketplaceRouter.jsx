import { Routes, Route } from "react-router-dom";
import Login from "./Screens/login/Login.jsx";
import CreateUser from "../src/Screens/create-user/CreateUser.jsx";

function MarketplaceRouter() {
  return (
    <div className="mktp-container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-user" element={<CreateUser />} />
      </Routes>
    </div>
  );
}

export default MarketplaceRouter;
