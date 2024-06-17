import "./homeArticles.css";
import HomeArticle from "./HomeArticle";
import DatasOffers from "../../interfaces/DatasOffers";
const HomeArticles = ({ data }: { data: DatasOffers }) => {
  const nbArticle = data.offers.filter((offer) => {
    return "product_name" in offer;
  }).length;
  return (
    <section className="home-articles container">
      {data.offers.map((offer, index) => {
        return (
          <HomeArticle
            key={offer._id}
            offer={offer}
            nbArticle={nbArticle}
            articleIndex={index}
          />
        );
      })}
    </section>
  );
};

export default HomeArticles;
