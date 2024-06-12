import "./homeArticles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import HomeArticle from "./HomeArticle";
import DatasOffers from "../../interfaces/DatasOffers";

const HomeArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DatasOffers>();

  useEffect(() => {
    const url = import.meta.env.VITE_VINTED_API_URL + "/offers";
    const fetchData = async () => {
      const response = await axios.get(url);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="home-articles">
      {isLoading ? (
        <Loading />
      ) : (
        data?.offers.map((offer) => {
          return <HomeArticle key={offer._id} offer={offer} />;
        })
      )}
    </section>
  );
};

export default HomeArticles;
