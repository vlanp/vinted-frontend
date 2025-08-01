import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import "./signInModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const unacceptedLocation = ["/publish", "/payment"];

const SignInModal = ({
  signInModal,
  setSignInModal,
  setUserToken,
  userToken,
}: {
  signInModal: boolean;
  setSignInModal: Dispatch<SetStateAction<boolean>>;
  setUserToken: Dispatch<SetStateAction<string | undefined>>;
  userToken: string | undefined;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [connectionError, setConnectionError] = useState(false);

  const location = useLocation().pathname;
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.length === 0) {
      return alert("L'email est vide");
    }
    if (password.length === 0) {
      return alert("Le mot de passe est vide");
    }
    const json = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        import.meta.env.VITE_VINTED_API_URL + "/user/login",
        json
      );
      Cookies.set("userToken", response.data.token);
      setConnectionError(false);
      setUserToken(response.data.token);
      setSignInModal(!signInModal);
    } catch (error) {
      setConnectionError(true);
    }
  };

  return userToken ? (
    <></>
  ) : (
    <section className="sign-in-modal">
      <form onSubmit={handleSubmit}>
        <FontAwesomeIcon
          className="close"
          icon={"xmark"}
          onClick={() => {
            setSignInModal(!signInModal);
            if (unacceptedLocation.includes(location)) {
              navigate("/");
            }
          }}
        />
        <p className="form-title">Se connecter</p>
        <div>
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        {connectionError && (
          <p className="connection-error">Mauvais email et/ou mot de passe</p>
        )}
        <div>
          <button>Se connecter</button>
          <p
            onClick={() => {
              setSignInModal(false);
              navigate("/signup");
            }}
          >
            Pas encore de compte ? Inscris-toi !
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignInModal;
