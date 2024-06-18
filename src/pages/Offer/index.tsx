import "./offer.css";
import { useParams } from "react-router-dom";
import "./offer.css";
import { useEffect, useState } from "react";
import { Offer as IOffer } from "../../interfaces/DatasOffers";
import Loading from "../../components/Loading";
import fetchData from "../../utils/fetchData";
import { useNavigate } from "react-router-dom";

const Offer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IOffer>();
  const id = useParams().id;

  const navigate = useNavigate();

  useEffect(() => {
    fetchData({
      endpoint: "/v2/offers/" + id,
      setData: setData,
      setIsLoading: setIsLoading,
    });
  }, [id]);

  return (
    <main className="offer-overview">
      {isLoading ? (
        <Loading />
      ) : (
        <section>
          <img src={data?.product_image.secure_url} alt={data?.product_name} />

          <aside>
            <p>{data?.product_price.toFixed(2).replace(".", ",") + " €"}</p>
            <div className="details">
              {data?.product_details.map((detail) => {
                const key = Object.keys(detail)[0];
                const value = Object.values(detail)[0];
                return (
                  <>
                    <div key={key}>
                      <p>{key}</p>
                      <p>{value}</p>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="separation-line"></div>
            <div className="general-information">
              <p>{data?.product_name}</p>
              <p>{data?.product_description}</p>
              <div className="seller">
                <img
                  src={data?.owner.account.avatar?.secure_url}
                  alt="avatar"
                />
                <p>{data?.owner.account.username}</p>
              </div>
            </div>
            <button
              onClick={() => {
                navigate("/payment", {
                  state: {
                    productName: data?.product_name,
                    productPrice: data?.product_price,
                    productId: data?._id,
                  },
                });
              }}
            >
              Acheter
            </button>
          </aside>
        </section>
      )}
    </main>
  );
};

export default Offer;
