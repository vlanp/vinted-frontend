import "./offer.css";
import { useParams } from "react-router-dom";
import "./offer.css";
import { useEffect, useState } from "react";
import { Offer as IOffer } from "../../interfaces/DatasOffers";
import axios from "axios";
import Loading from "../../components/Loading";
import Detail, { TDetail } from "../../enums/Detail";

const Offer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IOffer>();
  const id = useParams().id;

  useEffect(() => {
    const url = import.meta.env.VITE_VINTED_API_URL + "/offers/" + id;
    const fetchData = async () => {
      const response = await axios.get(url);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  const getDetail = (detail: TDetail) => {
    const searchedDetail = data?.product_details.find((_detail) => {
      return detail in _detail;
    });
    const detailValue = searchedDetail ? searchedDetail[detail] : null;
    return detailValue;
  };

  const brand = getDetail(Detail.MARQUE);
  const size = getDetail(Detail.TAILLE);
  const condition = getDetail(Detail.ETAT);
  const color = getDetail(Detail.COULEUR);
  const localisation = getDetail(Detail.EMPLACEMENT);
  const paiement = getDetail(Detail.PAIEMENT);

  return (
    <main className="offer-overview">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <article>
            <img
              src={data?.product_image.secure_url}
              alt={data?.product_name}
            />
          </article>
          <aside>
            <p>{data?.product_price.toFixed(2).replace(".", ",") + " €"}</p>
            <div className="details">
              {brand ? (
                <div>
                  <p>MARQUE</p>
                  <p>{brand}</p>
                </div>
              ) : null}
              {size ? (
                <div>
                  <p>TAILLE</p>
                  <p>{size}</p>
                </div>
              ) : null}
              {condition ? (
                <div>
                  <p>ETAT</p>
                  <p>{condition}</p>
                </div>
              ) : null}
              {color ? (
                <div>
                  <p>COULEUR</p>
                  <p>{color}</p>
                </div>
              ) : null}
              {localisation ? (
                <div>
                  <p>EMPLACEMENT</p>
                  <p>{localisation}</p>
                </div>
              ) : null}
              {paiement ? (
                <div>
                  <p>PAIEMENT</p>
                  <p>{paiement}</p>
                </div>
              ) : null}
            </div>
            <div className="general-information">
              <p>{data?.product_name}</p>
              <p>{data?.product_description}</p>
              <div className="seller">
                <img src={data?.owner.account.avatar.secure_url} alt="avatar" />
                <p>{data?.owner.account.username}</p>
              </div>
            </div>
            <button>Acheter</button>
          </aside>
        </>
      )}
    </main>
  );
};

export default Offer;
