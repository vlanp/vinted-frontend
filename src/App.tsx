import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import SignUp from "./pages/SignUp";
import SellArticle from "./components/SellArticle";

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
} from "@fortawesome/free-solid-svg-icons";
library.add(faSpinner, faMagnifyingGlass, faXmark, faArrowUp, faArrowDown);

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
          element={<SignUp userToken={userToken} setUserToken={setUserToken} />}
        />
        <Route path="publish" element={<SellArticle />} />
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
