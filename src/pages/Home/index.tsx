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
import useWindowDimensions from "../../utils/getWindowDimensions";
import { v4 as uuidv4 } from "uuid";
import PageHandling from "../../components/PageHandling";
import Sort from "../../enums/Sort";

const Home = ({ search }: { search: string }) => {
  const [sort, setSort] = useState<Sort>(Sort.ASCENDING);
  const [values, setValues] = useState<RangeValues>();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [allData, setAllData] = useState<DatasOffers>();
  const [data, setData] = useState<DatasOffers>();
  const [currentPage, setCurrentPage] = useState(1);

  const { width } = useWindowDimensions();

  let limit;
  if (width >= 1200) {
    limit = 4 * 5;
  } else if (width >= 900) {
    limit = 4 * 4;
  } else if (width >= 700) {
    limit = 5 * 3;
  } else if (width >= 500) {
    limit = 6 * 2;
  } else {
    limit = 10;
  }

  const maxPage = data ? Math.ceil(data.count / limit) : 0;

  useEffect(() => {
    const fetchDataAndAddFake = async () => {
      const data = await fetchData<DatasOffers>({
        endpoint:
          "/offers?page=" +
          currentPage +
          "&limit=" +
          limit +
          "&sort=" +
          sort +
          "&priceMin=" +
          (values?.minValue || 0) +
          "&priceMax=" +
          (values?.maxValue || Infinity) +
          "&title=" +
          search,
      });
      if (!data) {
        return;
      }

      const dataCopy = { ...data };
      // Création de fausses offres pour gérer l'affichage de la dernière ligne d'offres
      for (let i = 0; i <= 4; i++) {
        dataCopy.offers.push({ _id: uuidv4() });
      }
      dataCopy && setData(dataCopy);
      data && setIsLoading(false);
    };
    fetchDataAndAddFake();
  }, [currentPage, limit, sort, values, search]);

  let lowerPrice = 100;
  let higherPrice = lowerPrice + 5;
  allData?.offers.forEach((value) => {
    if (!("product_name" in value)) {
      return;
    }
    if (value.product_price > higherPrice) {
      higherPrice = value.product_price;
    }
    if (value.product_price < lowerPrice) {
      lowerPrice = value.product_price;
    }
    lowerPrice = Math.floor(lowerPrice / 5) * 5;
    higherPrice = Math.ceil(higherPrice / 5) * 5;
    higherPrice += higherPrice === lowerPrice ? 5 : 0;
  });

  useEffect(() => {
    fetchData({
      endpoint: "/offers",
      setData: setAllData,
      setIsLoading: setIsLoading2,
    });
  }, []);

  return (
    <main>
      {isLoading || isLoading2 ? (
        <Loading />
      ) : (
        <>
          <section className="home-filter-section">
            <SortAscDesc text="Trier par prix:" sort={sort} setSort={setSort} />
            <FilterRange
              values={values || { minValue: lowerPrice, maxValue: higherPrice }}
              setValues={setValues}
              minRange={lowerPrice}
              maxRange={higherPrice}
              text="Prix entre:"
            />
          </section>
          <HomeHero />
          <HomeArticles data={data!} />
          <PageHandling
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            maxPage={maxPage}
            setIsLoading={setIsLoading}
          />
        </>
      )}
    </main>
  );
};

export default Home;
