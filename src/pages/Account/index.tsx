import "./account.css";
import { useEffect, useState } from "react";
import AccountData from "../../interfaces/AccountData";
import axios, { AxiosError } from "axios";
import MyError from "../../interfaces/MyError";
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Account = ({ userToken }: { userToken: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [data, setData] = useState<AccountData>();

  useEffect(() => {
    const fetchData = async () => {
      setErrorMessage("");
      try {
        const response = await axios.get(
          import.meta.env.VITE_VINTED_API_URL + "/user/account",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data?.username) {
          setData(response.data);
          setIsLoading(false);
        } else {
          setErrorMessage(
            "Une erreur inconnue est survenu. Merci de réessayer plus tard"
          );
          setIsLoading(false);
        }
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
    fetchData();
  }, [userToken]);

  return isLoading ? (
    <Loading />
  ) : (
    <main className="my-account">
      <form>
        {errorMessage ? (
          <p className="my-account-error-message">{errorMessage}</p>
        ) : (
          <>
            <div>
              <p>Nom d'utilisateur</p>
              <div>
                <FontAwesomeIcon className="account-modify-icon" icon={"pen"} />
                <p>{data?.username}</p>
              </div>
            </div>
            <div>
              <p>Email</p>
              <p>{data?.email}</p>
            </div>
            <div>
              <p>Compte activé</p>
              <div>
                <FontAwesomeIcon className="account-modify-icon" icon={"pen"} />
                <p>{data?.active ? "Oui" : "Non"}</p>
              </div>
            </div>
            <div>
              <p>Newsletter</p>
              <div>
                <FontAwesomeIcon className="account-modify-icon" icon={"pen"} />
                <p>{data?.newsletter ? "Oui" : "Non"}</p>
              </div>
            </div>
            <div>
              <p>Photo de profil</p>
              <div>
                <FontAwesomeIcon className="account-modify-icon" icon={"pen"} />
                <img src={data?.avatar} alt="avatar" />
              </div>
            </div>
          </>
        )}
      </form>
    </main>
  );
};

export default Account;
