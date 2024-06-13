import { FormEvent, useState } from "react";
import "./signUp.css";
import axios from "axios";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import MyError from "../../interfaces/MyError";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      Cookies.set("userToken", response.data.token);
    } catch (error: unknown) {
      const _error = error as AxiosError;
      console.log({
        status: _error.response?.status || "unknown",
        message:
          (_error.response?.data as MyError).message ||
          "Erreur inconnue du serveur",
      });
    }
  };

  return (
    <main className="sign-up">
      <form onSubmit={handleSubmit}>
        <p>S'inscrire</p>
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
          <p>
            {newsletter ? (
              <input
                type="checkbox"
                checked
                onClick={() => {
                  setNewsletter(!newsletter);
                }}
              />
            ) : (
              <input
                type="checkbox"
                onClick={() => {
                  setNewsletter(!newsletter);
                }}
              />
            )}
            S'inscrire à notre newsletter
          </p>
          <p>
            En m'inscrivant, je confirme avoir li et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans
          </p>
        </div>
        <div>
          <button>S'inscrire</button>
          <p>Tu as déjà un compte ? Connecte-toi !</p>
        </div>
      </form>
    </main>
  );
};

export default SignUp;