import { useLocation } from "react-router-dom";
import "./validAddressEmail.css";

const ValidAddressEmail = () => {
  const historyState = useLocation().state;

  if (!historyState) {
    return <></>;
  }

  const { email } = historyState;

  return (
    <section className="valid-address-email">
      <div>
        <p>
          Merci de cliquer sur le lien que vous avez reçu sur la boite mail{" "}
          <span>{email}</span> afin d'activer votre compte.
        </p>
      </div>
    </section>
  );
};

export default ValidAddressEmail;
