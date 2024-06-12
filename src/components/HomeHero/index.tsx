import "./homeHero.css";
import homeHero from "../../assets/img/home-hero.jpg";

const HomeHero = () => {
  return (
    <section className="home-hero">
      <img src={homeHero} alt="2 womens with clothes" />
      <div className="in-home-hero">
        <p>Prêts à faire du tri dans vos placards ?</p>
        <button>Commencer à vendre</button>
      </div>
    </section>
  );
};

export default HomeHero;
