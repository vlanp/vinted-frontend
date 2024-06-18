import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import SignUp from "./pages/SignUp";
import SellArticle from "./pages/SellArticle";
import CheckOut from "./pages/CheckOut";
import ValidAddressEmail from "./pages/ValidEmailAddress";
import Account from "./pages/Account";

// Components
import Header from "./components/Header";
import SignInModal from "./components/SignInModal";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSpinner,
  faMagnifyingGlass,
  faXmark,
  faArrowUp,
  faArrowDown,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faSpinner,
  faMagnifyingGlass,
  faXmark,
  faArrowUp,
  faArrowDown,
  faPen
);

function App() {
  const [signInModal, setSignInModal] = useState(false);
  const [userToken, setUserToken] = useState(Cookies.get("userToken"));
  const [search, setSearch] = useState("");
  return (
    <Router>
      <Header
        signInModal={signInModal}
        setSignInModal={setSignInModal}
        userToken={userToken}
        setUserToken={setUserToken}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/offers/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={
            <SignUp
              userToken={userToken}
              setSignInModal={setSignInModal}
              setUserToken={setUserToken}
            />
          }
        />
        <Route
          path="/publish"
          element={
            <SellArticle
              token={userToken || ""}
              setSignInModal={setSignInModal}
            />
          }
        />
        <Route
          path="/payment"
          element={
            <CheckOut token={userToken || ""} setSignInModal={setSignInModal} />
          }
        />
        <Route path="/account-validation" element={<ValidAddressEmail />} />
        <Route
          path="/account"
          element={<Account userToken={userToken || ""} />}
        />
      </Routes>
      {signInModal && (
        <SignInModal
          signInModal={signInModal}
          setSignInModal={setSignInModal}
          setUserToken={setUserToken}
        />
      )}
    </Router>
  );
}

export default App;
