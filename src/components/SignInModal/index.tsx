import "./signInModal.css";

const SignInModal = () => {
  return (
    <section className="sign-in-modal">
      <form>
        <p>Se connecter</p>
        <div>
          <input type="email" placeholder="Adresse email" />
          <input type="password" placeholder="Mot de passe" />
        </div>
        <div>
          <button>Se connecter</button>
          <p>Pas encore de compte ? Inscris-toi !</p>
        </div>
      </form>
    </section>
  );
};

export default SignInModal;
