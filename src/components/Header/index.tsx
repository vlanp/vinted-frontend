import "./header.css";
import logoVinted from "../../assets/img/logo-vinted.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";

const Header = ({
  signInModal,
  setSignInModal,
}: {
  signInModal: boolean;
  setSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <header>
      <Link to={"/"}>
        <img src={logoVinted} alt="vinted" />
      </Link>
      <div className="search">
        <FontAwesomeIcon icon={"magnifying-glass"} />
        <input type="text" placeholder="Recherche des articles" />
      </div>
      <div className="connection">
        <Link to="/signup">
          <button>S'inscrire</button>
        </Link>
        <button
          onClick={() => {
            setSignInModal(!signInModal);
          }}
        >
          Se connecter
        </button>
      </div>
      <div className="sell">
        <button>Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
