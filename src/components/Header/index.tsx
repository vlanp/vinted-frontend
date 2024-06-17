import "./header.css";
import logoVinted from "../../assets/img/logo-vinted.png";
import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import Cookies from "js-cookie";
import SearchBar from "../SearchBar";

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
      <section className="container-when-900">
        <Link to={"/"} className="header-logo-vinted">
          <img src={logoVinted} alt="vinted" />
        </Link>
        <SearchBar className="hide-when-900" />
        <div className="connection">
          {userToken ? (
            <button
              className="deconnect-button"
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
      </section>
      <section className="container-when-900">
        <SearchBar className="show-when-900" />
      </section>
    </header>
  );
};

export default Header;
