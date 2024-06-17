import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sellArticle.css";
import { FormEvent, useState } from "react";

const SellArticle = () => {
  const [picture, setPicture] = useState<File | undefined>();
  const [previewPicture, setPreviewPicture] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>();
  const [exchange, setExchange] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      console.log(event);
    } catch (error) {}
  };

  return (
    <section className="sell-article">
      <form onSubmit={handleSubmit}>
        <p className="sell-article-title">Vends ton article</p>
        <div className="sell-article-picture">
          <div>
            {previewPicture ? (
              <>
                <img alt="preview picture" src={previewPicture} />
                <FontAwesomeIcon
                  className="sell-article-delete-picture"
                  icon={"xmark"}
                  onClick={() => {
                    setPreviewPicture("");
                  }}
                />
              </>
            ) : (
              <>
                {" "}
                <input
                  type="file"
                  onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                      setPreviewPicture(
                        URL.createObjectURL(event.target.files[0])
                      );
                      setPicture(event.target.files[0]);
                    }
                  }}
                />
                <p>
                  <span>+</span>Ajoute une photo
                </p>
              </>
            )}
          </div>
        </div>
        <section className="sell-article-article">
          <div>
            <p>Titre</p>
            <input
              type="text"
              placeholder="ex: Chemise Sézane verte"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              value={title}
            />
          </div>
          <div>
            <p>Décris ton article</p>
            <input
              type="text"
              placeholder="ex: porté quelquefois, taille corretement"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              value={description}
            />
          </div>
        </section>
        <section className="sell-article-details">
          <div>
            <p>Marque</p>
            <input
              type="text"
              placeholder="ex: Zara"
              onChange={(event) => {
                setBrand(event.target.value);
              }}
              value={brand}
            />
          </div>
          <div>
            <p>Taille</p>
            <input
              type="text"
              placeholder="ex: L/40/12"
              onChange={(event) => {
                setSize(event.target.value);
              }}
              value={size}
            />
          </div>
          <div>
            <p>Couleur</p>
            <input
              type="text"
              placeholder="ex: Fushia"
              onChange={(event) => {
                setColor(event.target.value);
              }}
              value={color}
            />
          </div>
          <div>
            <p>Etat</p>
            <input
              type="text"
              placeholder="Neuf avec étiquette"
              onChange={(event) => {
                setCondition(event.target.value);
              }}
              value={condition}
            />
          </div>
          <div>
            <p>Lieu</p>
            <input
              type="text"
              placeholder="ex: Paris"
              onChange={(event) => {
                setLocation(event.target.value);
              }}
              value={location}
            />
          </div>
        </section>
        <section className="sell-article-paiement">
          <div>
            <p>Prix</p>
            <input
              type="number"
              placeholder="0,00"
              onChange={(event) => {
                setPrice(Number(event.target.value));
              }}
              value={price}
            />
          </div>
          <p>
            <input
              type="checkbox"
              checked={exchange}
              onClick={() => {
                setExchange(!exchange);
              }}
            />
            Je suis intéressé(e) par les échanges
          </p>
        </section>
      </form>
    </section>
  );
};

export default SellArticle;
