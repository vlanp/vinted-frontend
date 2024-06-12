import "./header.css";
import logoVinted from "../../assets/img/logo-vinted.png";

const Header = () => {
  return (
    <header>
      <img src={logoVinted} alt="vinted" />
      <input type="text" placeholder="Recherche des articles" />
      <div>
        <button>S'inscrire</button>
        <button>Se connecter</button>
      </div>
      <button>Vends tes articles</button>
    </header>
  );
};

export default Header;
