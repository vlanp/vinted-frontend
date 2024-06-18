import "./checkOut.css";
import CheckOutForm from "../../components/CheckOutForm";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckOut = ({
  token,
  setSignInModal,
}: {
  token: string;
  setSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [completed, setCompleted] = useState<boolean>(false);
  const { productPrice, productName, productId } = useLocation().state;
  const protectionFees = productPrice / 10;
  const deliveryFees = productPrice / 5;
  const total = productPrice + protectionFees + deliveryFees;
  const options: StripeElementsOptions = {
    mode: "payment",
    amount: Number((total * 100).toFixed(0)),
    currency: "eur",
  };

  useEffect(() => {
    token || setSignInModal(true);
  }, [token, setSignInModal]);

  return token ? (
    <section className="check-out">
      <div>
        <div className="check-out-summary">
          <p>Résumé de la commande</p>
          <div>
            <div>
              <p>Commande</p>
              <p>{productPrice.toFixed(2).replace(".", ",") + " €"}</p>
            </div>
            <div>
              <p>Frais protection acheteurs</p>
              <p>{protectionFees.toFixed(2).replace(".", ",") + " €"}</p>
            </div>
            <div>
              <p>Frais de port</p>
              <p>{deliveryFees.toFixed(2).replace(".", ",") + " €"}</p>
            </div>
          </div>
        </div>
        <div className="check-out-total">
          <div>
            <p>Total</p>
            <p>{total.toFixed(2).replace(".", ",") + " €"}</p>
          </div>
          {!completed && (
            <p>
              Il ne vous reste plus qu'une étape pour vous offrir{" "}
              <span>{productName}</span>. Vous allez payer{" "}
              <span>{productPrice} €</span> (frais de protection et frais de
              port inclus).
            </p>
          )}
        </div>
        <div className="check-out-stripe">
          <Elements stripe={stripePromise} options={options}>
            <CheckOutForm
              id={productId}
              completed={completed}
              setCompleted={setCompleted}
            />
          </Elements>
        </div>
      </div>
    </section>
  ) : (
    <></>
  );
};

export default CheckOut;
