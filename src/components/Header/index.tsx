import "./header.css";
import logoVinted from "../../assets/img/logo-vinted.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import Cookies from "js-cookie";

const Header = ({
  signInModal,
  setSignInModal,
  userToken,
  setUserToken,
}: {
  signInModal: boolean;
  setSignInModal: Dispatch<SetStateAction<boolean>>;
  userToken: string | undefined;
  setUserToken: Dispatch<SetStateAction<string | undefined>>;
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
        {userToken ? (
          <button
            onClick={() => {
              Cookies.remove("userToken");
              setUserToken(Cookies.get("userToken"));
            }}
          >
            Se deconnecter
          </button>
        ) : (
          <>
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
          </>
        )}
      </div>
      <div className="sell">
        <button>Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
