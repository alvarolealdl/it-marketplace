import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import MarketplaceRouter from "./MarketplaceRouter.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/_Global.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-or2yoj31xakbfvmr.us.auth0.com"
    clientId="8UNTihUSUSl3lDm9UN4P6RNISoKxblJj"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <BrowserRouter>
      <MarketplaceRouter />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  </Auth0Provider>
);
