import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import SignUp from "./pages/SignUp";

// Components
import Header from "./components/Header";
import SignInModal from "./components/SignInModal";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSpinner,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
library.add(faSpinner, faMagnifyingGlass, faXmark);

function App() {
  const [signInModal, setSignInModal] = useState(false);
  const [userToken, setUserToken] = useState(Cookies.get("userToken"));
  return (
    <Router>
      <Header
        signInModal={signInModal}
        setSignInModal={setSignInModal}
        userToken={userToken}
        setUserToken={setUserToken}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={<SignUp userToken={userToken} setUserToken={setUserToken} />}
        />
      </Routes>
      {signInModal && (
        <SignInModal
          signInModal={signInModal}
          setSignInModal={setSignInModal}
          userToken={userToken}
          setUserToken={setUserToken}
        />
      )}
    </Router>
  );
}

export default App;
