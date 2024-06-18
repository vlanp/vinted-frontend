import { useElements, useStripe } from "@stripe/react-stripe-js";
import "./checkOutForm.css";
import { PaymentElement } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import axios from "axios";

const CheckOutForm = ({ title, amount }: { title: string; amount: number }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log("yo");

    event.preventDefault();

    setIsLoading(true);

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError && submitError.message) {
      setErrorMessage(submitError.message);
      return;
    }

    const response = await axios.post(
      import.meta.env.VITE_VINTED_API_URL + "/v2/payment",
      {
        title,
        amount,
      }
    );

    const clientSecret = response.data.client_secret;

    console.log(clientSecret);

    const stripeResponse = await stripe?.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
      redirect: "if_required",
    });

    if (stripeResponse?.paymentIntent?.status === "succeeded") {
      setCompleted(true);
    }

    setIsLoading(false);
  };

  return completed ? (
    <p>Paiement effectué</p>
  ) : (
    <section className="check-out-form">
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type="submit" disabled={!stripe || !elements || isLoading}>
          Pay
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </section>
  );
};

export default CheckOutForm;
