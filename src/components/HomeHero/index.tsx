import "./homeHero.css";
import homeHero from "../../assets/img/home-hero.jpg";
import { useNavigate } from "react-router-dom";

const HomeHero = () => {
  const navigate = useNavigate();
  return (
    <section className="home-hero">
      <img src={homeHero} alt="2 womens with clothes" />
      <div className="in-home-hero">
        <p>Prêts à faire du tri dans vos placards ?</p>
        <button
          onClick={() => {
            navigate("/publish");
          }}
        >
          Commencer à vendre
        </button>
      </div>
    </section>
  );
};

export default HomeHero;
