import "./homeArticle.css";
import { Detail, Offer } from "../../../interfaces/DatasOffers";
import { Link } from "react-router-dom";

const HomeArticle = ({ offer }: { offer: Offer }) => {
  return (
    <Link to={"/offers/" + offer._id} className="home-article">
      <div>
        <img src={offer.owner.account.avatar.secure_url} alt="avatar" />
        <p>{offer.owner.account.username}</p>
      </div>
      <img src={offer.product_image.secure_url} alt={offer.product_name} />
      <p>{offer.product_price.toFixed(2).replace(".", ",") + " €"}</p>
      {offer.product_details
        .filter((detail) => {
          const key = Object.keys(detail)[0];
          return key === Detail.MARQUE || key === Detail.TAILLE;
        })
        .map((detail) => {
          const key = Object.keys(detail)[0];
          const value = Object.values(detail)[0];
          return <p key={key}>{value}</p>;
        })}
    </Link>
  );
};

export default HomeArticle;
