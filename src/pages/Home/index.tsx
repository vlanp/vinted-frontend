import "./home.css";
import HomeHero from "../../components/HomeHero";
import HomeArticles from "../../components/HomeArticles";
import SortAscDesc from "../../components/SortAscDesc";
import FilterRange from "../../components/FilterRange";
import { useEffect, useState } from "react";
import RangeValues from "../../interfaces/RangeValues";
import fetchData from "../../utils/fetchData";
import Loading from "../../components/Loading";
import DatasOffers from "../../interfaces/DatasOffers";

const Home = () => {
  const [state, setState] = useState(false);
  const [values, setValues] = useState<RangeValues>();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DatasOffers>();

  useEffect(() => {
    fetchData({
      endpoint: "/v2/offers",
      setData: setData,
      setIsLoading: setIsLoading,
    });
  }, []);

  let lowerPrice = Infinity;
  let higherPrice = 0;
  data?.offers.forEach((value) => {
    if (!("product_name" in value)) {
      return;
    }
    if (value.product_price > higherPrice) {
      higherPrice = value.product_price;
    }
    if (value.product_price < lowerPrice) {
      lowerPrice = value.product_price;
    }
  });

  return (
    <main>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <section className="home-filter-section">
            <SortAscDesc
              text="Trier par prix:"
              state={state}
              setState={setState}
            />
            <FilterRange
              values={values || { minValue: lowerPrice, maxValue: higherPrice }}
              setValues={setValues}
              minRange={lowerPrice}
              maxRange={higherPrice}
            />
          </section>
          <HomeHero />
          <HomeArticles data={data!} />
        </>
      )}
    </main>
  );
};

export default Home;
