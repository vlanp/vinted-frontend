import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sellArticle.css";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SellArticle = ({
  token,
  setSignInModal,
}: {
  token: string;
  setSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [picture, setPicture] = useState<File | undefined>();
  const [previewPicture, setPreviewPicture] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<string>("0");
  const [exchange, setExchange] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    token || setSignInModal(true);
  }, [token, setSignInModal]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      //   const target = event.currentTarget;

      //   for (let i = 0; i < target.length; i++) {
      //     if (target.elements[i].getAttribute("name")) {
      //       if (!target.elements[i].value) {
      //         return alert("Le formulaire est incomplet");
      //       }
      //       formData[target.elements[i].getAttribute("name")] =
      //         target.elements[i].value;
      //     }
      //   }
      console.log(picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("location", location);
      formData.append("price", price);
      picture && formData.append("picture", picture);

      console.log(formData);

      const response = await axios.post(
        import.meta.env.VITE_VINTED_API_URL + "/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      navigate("/offers/" + response.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  return token ? (
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
                <input
                  type="file"
                  name="picture"
                  onChange={(event) => {
                    console.log(event);

                    if (event.target.files && event.target.files[0]) {
                      console.log(event.target.files[0]);

                      setPicture(event.target.files[0]);
                      setPreviewPicture(
                        URL.createObjectURL(event.target.files[0])
                      );
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
              name="title"
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
              name="description"
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
              name="brand"
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
              name="size"
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
              name="color"
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
              name="condition"
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
              name="city"
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
              name="price"
              placeholder="0,00"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              value={price}
            />
          </div>
          <p>
            <input
              type="checkbox"
              checked={exchange}
              onChange={() => {
                setExchange(!exchange);
              }}
            />
            Je suis intéressé(e) par les échanges
          </p>
        </section>
        <button>Créer l'offre</button>
      </form>
    </section>
  ) : (
    <section></section>
  );
};

export default SellArticle;
