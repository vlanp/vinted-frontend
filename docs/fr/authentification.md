---
title: Authentification
description: Sécurisation des routes et gestion des accès utilisateur
nav: 3
id: b6119cf2d6ad9cfe74984a025a002887
---

## Création d'un compte

3 états ont été créés afin de contenir les informations à envoyer au serveur pour la création du compte : le nom d'utilisateur, l'adresse mail et le mot de passe. Un 4ème état a été créer afin de pouvoir répéter la saisie du mot de passe et s'assurer qu'il n'y a pas eu d'erreur de la part de l'utilisateur.

```tsx
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmedPassword, setConfirmedPassword] = useState("");
```

4 **input** sont créés afin de pouvoir mettre à jour les 4 états associés, en associant les fonctions **_onChange_** des **input** avec les fonctions de mise à jour des états. De plus, les propriétés **_value_** sont associées aux états afin de s'assurer que l'affichage reflète toujours la valeur des états.

```tsx
<>
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
</>
```

Les **input** sont placés dans un **form**, et un bouton contrôle la soumission des données par le déclenchement du **_onSubmit_** du **form** qui appelle à son tour la fonction **_handleSubmit_**.

```tsx
<form onSubmit={handleSubmit}>
  ... // Inputs
  <button>S'inscrire</button>
</form>
```

Un nouvel état est créer pour contenir les eventuelles erreurs pouvant survenir pendant la soumission du formulaire.

```tsx
const [errorMessage, setErrorMessage] = useState<string>("");
```

La soumission se fait en plusieurs étapes :

- Appel de la fonction **_preventDefault_** sur l'**_event_** pour empêcher le navigateur de changer de page lors de la soumission du formulaire
- L'état **_errorMessage_** est remis à son état initial car si un message d'erreur existait, il n'a plus lieu d'être suite à la soumission d'un nouveau formulaire
- Des vérifications sont faites sur le mot de passe et le nom d'utilisateur à partir des états associés. Dans le cas où un problème est détecté, une popup est affichée pour alerter l'utilisateur sur le problème rencontré
- Un json est créé avec le contenu des états et est envoyé en tant que body dans la requête **_post_** au serveur

Si aucune exception est levée lors de la requête avec **_axios_**, cela signifie que la réponse contient un statut correspondant à un succès. Nous vérifions alors que la réponse contient bien les données du compte créé puis :

- Nous mettons à jour l'état contenant le token de l'utilisateur, qui sera utilisé pour prouver que l'utilisateur est authentifié
- Nous mettons à jour le cookie **_userToken_** pour contenir le token de l'utilisateur, qui pourra être utilisé par la suite pour conserver la connexion au compte malgré le redémarrage et le reset des états du site
- Nous redirigeons l'utilisateur vers la page de validation d'adresse email. Une adresse email non vérifiée empêchera à l'utilisateur de publier des offres on de procéder à des achats

En cas d'exception levée suite à la requête avec **_axios_**, ou de réponse ne contenant pas les données prévues, nous mettons à jour l'état **_errorMessage_** avec les informations que nous avons à notre disposition.

```tsx
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
```

Si un message d'erreur a été indiqué, il est affiché à l'utilisateur en bas du formulaire.

```tsx
<form onSubmit={handleSubmit}>
  ... // Inputs
  { errorMessage && <p>{errorMessage}</p>;}
  <button>S'inscrire</button>
</form>
```

Le code complet pour la création d'un compte est le suivant.

```tsx
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
```

## Connexion à un compte

La logique utilisée pour la connexion à un compte est très similaire à celle de la création du compte, sauf qu'il n'y a plus que 2 états soumis par le formulaire (email et mot de passe) au lieu de 4.

Le code est le suivant.

[src/components/SignInModal/index.tsx](https://github.com/vlanp/vinted-frontend/blob/095b37550a1137a766a1c48c194b749b2e3dd606/src/components/SignInModal/index.tsx)
