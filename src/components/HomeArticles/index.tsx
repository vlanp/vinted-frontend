import "./homeArticles.css";
import HomeArticle from "./HomeArticle";
import DatasOffers from "../../interfaces/DatasOffers";
import { v4 as uuidv4 } from "uuid";

const HomeArticles = ({ data }: { data: DatasOffers }) => {
  const dataCopy = { ...data };

  // Création de fausses offres pour gérer l'affichage de la dernière ligne d'offres
  for (let i = 0; i <= 4; i++) {
    dataCopy.offers?.push({ _id: uuidv4() });
  }

  return (
    <section className="home-articles container">
      {data.offers.map((offer, index) => {
        return (
          <HomeArticle
            key={offer._id}
            offer={offer}
            nbArticle={data.count}
            articleIndex={index}
          />
        );
      })}
    </section>
  );
};

export default HomeArticles;
