import { Offer } from "../../../interfaces/DatasOffers";

const HomeArticle = ({ offer }: { offer: Offer }) => {
  const keySize = "TAILLE";
  const sizeDetail = offer.product_details.find((detail) => {
    return keySize in detail;
  });
  const size = sizeDetail && keySize in sizeDetail ? sizeDetail.TAILLE : null;

  const keyBrand = "MARQUE";
  const brandDetail = offer.product_details.find((detail) => {
    return keyBrand in detail;
  });
  const brand =
    brandDetail && keyBrand in brandDetail ? brandDetail.MARQUE : null;

  return (
    <article className="home-article">
      <p>{offer.owner.account.username}</p>
      <img src={offer.product_image.secure_url} alt={offer.product_name} />
      <p>{offer.product_price.toFixed(2).replace(".", ",")}</p>
      <p>{size}</p>
      <p>{brand}</p>
    </article>
  );
};

export default HomeArticle;
