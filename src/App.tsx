import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

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
} from "@fortawesome/free-solid-svg-icons";
library.add(faSpinner, faMagnifyingGlass);

function App() {
  const [signInModal, setSignInModal] = useState(false);
  return (
    <Router>
      <Header signInModal={signInModal} setSignInModal={setSignInModal} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers/:id" element={<Offer />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <SignInModal />
    </Router>
  );
}

export default App;
