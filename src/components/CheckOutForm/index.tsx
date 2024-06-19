import { useElements, useStripe } from "@stripe/react-stripe-js";
import "./checkOutForm.css";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import axios, { AxiosError } from "axios";
import MyError from "../../interfaces/MyError";

const CheckOutForm = ({
  id,
  completed,
  setCompleted,
  token,
}: {
  id: string;
  completed: boolean;
  setCompleted: Dispatch<SetStateAction<boolean>>;
  token: string;
}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

    try {
      const response = await axios.post(
        import.meta.env.VITE_VINTED_API_URL + "/payment",
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const clientSecret = response.data.client_secret;

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
    } catch (error: unknown) {
      setIsLoading(false);
      const _error = error as AxiosError;
      console.log({
        status: _error.response?.status || "unknown",
        message:
          (_error.response?.data as MyError).message ||
          "Erreur inconnue du serveur",
      });
      setErrorMessage(
        (_error.response?.data as MyError).message ||
          "Erreur inconnue du serveur"
      );
    }
  };

  return completed ? (
    <p className="check-out-form-succeed">Merci pour votre achat</p>
  ) : (
    <section className="check-out-form">
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type="submit" disabled={!stripe || !elements || isLoading}>
          Payer
        </button>
        {errorMessage && (
          <p className="check-out-form-error-message">{errorMessage}</p>
        )}
      </form>
    </section>
  );
};

export default CheckOutForm;
