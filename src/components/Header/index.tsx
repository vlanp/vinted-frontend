import "./header.css";
import logoVinted from "../../assets/img/logo-vinted.png";
import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import Cookies from "js-cookie";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";

const Header = ({
  signInModal,
  setSignInModal,
  userToken,
  setUserToken,
  search,
  setSearch,
}: {
  signInModal: boolean;
  setSignInModal: Dispatch<SetStateAction<boolean>>;
  userToken: string | undefined;
  setUserToken: Dispatch<SetStateAction<string | undefined>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) => {
  const navigate = useNavigate();
  return (
    <header>
      <section className="container-when-900">
        <Link to={"/"} className="header-logo-vinted">
          <img src={logoVinted} alt="vinted" />
        </Link>
        <SearchBar
          className="hide-when-900"
          search={search}
          setSearch={setSearch}
        />
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
          <button
            onClick={() => {
              userToken ? navigate("/publish") : setSignInModal(!signInModal);
            }}
          >
            Vends tes articles
          </button>
        </div>
      </section>
      <section className="container-when-900">
        <SearchBar
          className="show-when-900"
          search={search}
          setSearch={setSearch}
        />
      </section>
    </header>
  );
};

export default Header;
