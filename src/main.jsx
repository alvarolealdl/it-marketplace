import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MarketplaceRouter from "./MarketplaceRouter.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/_Global.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MarketplaceRouter />
  </BrowserRouter>
);
