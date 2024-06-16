import "./homeArticles.css";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import HomeArticle from "./HomeArticle";
import DatasOffers from "../../interfaces/DatasOffers";
import fetchData from "../../utils/fetchData";
import { v4 as uuidv4 } from "uuid";

const HomeArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DatasOffers>();

  useEffect(() => {
    fetchData({
      endpoint: "/v2/offers",
      setData: setData,
      setIsLoading: setIsLoading,
    });
  }, []);

  const dataCopy = { ...data };

  // Création de fausses offres pour gérer l'affichage de la dernière ligne d'offres
  for (let i = 0; i <= 4; i++) {
    dataCopy.offers?.push({ _id: uuidv4() });
  }

  return (
    <section className="home-articles container">
      {isLoading ? (
        <Loading />
      ) : (
        data?.offers.map((offer, index) => {
          return (
            <HomeArticle
              key={offer._id}
              offer={offer}
              nbArticle={data.count}
              articleIndex={index}
            />
          );
        })
      )}
    </section>
  );
};

export default HomeArticles;
