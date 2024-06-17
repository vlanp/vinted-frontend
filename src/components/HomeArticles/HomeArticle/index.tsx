import "./homeArticle.css";
import { Detail, FakeOffer, Offer } from "../../../interfaces/DatasOffers";
import { Link } from "react-router-dom";

const HomeArticle = ({
  offer,
  nbArticle,
  articleIndex,
}: {
  offer: Offer | FakeOffer;
  nbArticle: number;
  articleIndex: number;
}) => {
  console.log(nbArticle);

  const limitIfFivePerRow = Math.ceil(nbArticle / 5) * 5;
  const limitIfFourPerRow = Math.ceil(nbArticle / 4) * 4;
  console.log(limitIfFourPerRow);

  const limitIfThreePerRow = Math.ceil(nbArticle / 3) * 3;
  const limitIfTwoPerRow = Math.ceil(nbArticle / 2) * 2;
  const limitIfOnePerRow = nbArticle;
  const hideIfFivePerRow =
    articleIndex + 1 > limitIfFivePerRow ? " hide-five-per-row" : "";
  const hideIfFourPerRow =
    articleIndex + 1 > limitIfFourPerRow ? " hide-four-per-row" : "";
  const hideIfThreePerRow =
    articleIndex + 1 > limitIfThreePerRow ? " hide-three-per-row" : "";
  const hideIfTwoPerRow =
    articleIndex + 1 > limitIfTwoPerRow ? " hide-two-per-row" : "";
  const hideIfOnePerRow =
    articleIndex + 1 > limitIfOnePerRow ? " hide-one-per-row" : "";

  return "product_name" in offer ? (
    <Link to={"/offers/" + offer._id} className="home-article">
      <div>
        <img src={offer.owner.account.avatar?.secure_url} alt="avatar" />
        <p>{offer.owner.account.username}</p>
      </div>
      <img src={offer.product_image.secure_url} alt={offer.product_name} />
      <p className="article-price">
        {offer.product_price.toFixed(2).replace(".", ",") + " €"}
      </p>
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
  ) : (
    <section
      className={
        "home-article" +
        hideIfFivePerRow +
        hideIfFourPerRow +
        hideIfThreePerRow +
        hideIfTwoPerRow +
        hideIfOnePerRow
      }
    ></section>
  );
};

export default HomeArticle;
