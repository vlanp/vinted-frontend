import "./loading.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = () => {
  return (
    <section className="loading">
      <p>Chargement de la page en cours</p>
      <div>
        <FontAwesomeIcon className="loading-icon" icon={"spinner"} />
      </div>
    </section>
  );
};

export default Loading;
