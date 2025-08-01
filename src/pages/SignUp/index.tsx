import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import "./signUp.css";
import axios from "axios";
import MyError from "../../interfaces/MyError";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignUp = ({
  userToken,
  setSignInModal,
  setUserToken,
}: {
  userToken: string | undefined;
  setSignInModal: Dispatch<SetStateAction<boolean>>;
  setUserToken: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) {
      navigate("/");
    }
  }, [navigate, userToken]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    if (confirmedPassword !== password) {
      return alert("Les 2 mots de passe ne correspondent pas");
    }
    if (password.length === 0) {
      return alert("Le mot de passe est vide");
    }
    if (username.length === 0) {
      return alert("Le nom d'utilisateur est vide");
    }
    const json = {
      email,
      username,
      password,
      newsletter,
    };

    try {
      const response = await axios.post(
        import.meta.env.VITE_VINTED_API_URL + "/user/signup",
        json
      );
      if ("_id" in response.data) {
        Cookies.set("userToken", response.data.token);
        setUserToken(response.data.token);
        navigate("/account-validation", { state: { email } });
      } else {
        setErrorMessage(
          "Une erreur inconnue est survenu. Merci de réessayer plus tard"
        );
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          (error.response?.data as MyError)?.message ||
            "Erreur inconnue du serveur"
        );
      } else {
        setErrorMessage("Erreur inconnue du serveur");
      }
    }
  };

  return userToken ? (
    <></>
  ) : (
    <main className="sign-up">
      <form onSubmit={handleSubmit}>
        <p className="form-title">S'inscrire</p>
        <div>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
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
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmedPassword}
            onChange={(event) => {
              setConfirmedPassword(event.target.value);
            }}
          />
        </div>
        <div>
          <p className="suscribe-newsletter">
            <input
              type="checkbox"
              checked={newsletter}
              onClick={() => {
                setNewsletter(!newsletter);
              }}
            />
            S'inscrire à notre newsletter
          </p>
          <p className="signup-condition">
            En m'inscrivant, je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans
          </p>
        </div>
        <div className="confirm-signup">
          {errorMessage && (
            <p className="sign-up-error-message">{errorMessage}</p>
          )}
          <button>S'inscrire</button>
          <p
            onClick={() => {
              setSignInModal(true);
            }}
          >
            Tu as déjà un compte ? Connecte-toi !
          </p>
        </div>
      </form>
    </main>
  );
};

export default SignUp;
