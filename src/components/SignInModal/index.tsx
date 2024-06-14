import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import "./signInModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import MyError from "../../interfaces/MyError";

const SignInModal = ({
  signInModal,
  setSignInModal,
  setUserToken,
}: {
  signInModal: boolean;
  setSignInModal: Dispatch<SetStateAction<boolean>>;
  setUserToken: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [connectionError, setConnectionError] = useState(false);

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
      const _error = error as AxiosError;
      console.log({
        status: _error.response?.status || "unknown",
        message:
          (_error.response?.data as MyError).message ||
          "Erreur inconnue du serveur",
      });
      setConnectionError(true);
    }
  };

  return (
    <section className="sign-in-modal">
      <form onSubmit={handleSubmit}>
        <FontAwesomeIcon
          className="close"
          icon={"xmark"}
          onClick={() => {
            setSignInModal(!signInModal);
          }}
        />
        <p>Se connecter</p>
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
          <p>Pas encore de compte ? Inscris-toi !</p>
        </div>
      </form>
    </section>
  );
};

export default SignInModal;
