import "./account.css";
import { FormEvent, useEffect, useState } from "react";
import AccountData from "../../interfaces/AccountData";
import axios, { AxiosError } from "axios";
import MyError from "../../interfaces/MyError";
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Account = ({ userToken }: { userToken: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [data, setData] = useState<AccountData>();
  const [modifyUsername, setModifyUsername] = useState<boolean>(false);
  const [modifyNewsletter, setModifyNewsletter] = useState<boolean>(false);
  const [modifyAvatar, setModifyAvatar] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [newsletter, setNewsletter] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string>("");

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log("yo");

    event.preventDefault();
    try {
      const formData = new FormData();
      modifyAvatar && avatar && formData.append("picture", avatar);
      modifyUsername && username && formData.append("username", username);
      modifyNewsletter &&
        newsletter &&
        formData.append("newsletter", newsletter.toString());
      const response = await axios.patch(
        import.meta.env.VITE_VINTED_API_URL + "/user/account",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data?.username) {
        setData(response.data);
      } else {
        setErrorMessage(
          "Une erreur inconnue est survenu. Merci de réessayer plus tard"
        );
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

  return isLoading ? (
    <Loading />
  ) : (
    <main className="my-account">
      <form onSubmit={handleSubmit}>
        {errorMessage ? (
          <p className="my-account-error-message">{errorMessage}</p>
        ) : (
          <>
            <div>
              <p>Nom d'utilisateur</p>
              <div>
                <FontAwesomeIcon
                  onClick={() => {
                    setModifyUsername(!modifyUsername);
                  }}
                  className={
                    "account-modify-icon" +
                    (modifyUsername ? " account-icon-red" : "")
                  }
                  icon={"pen"}
                />
                {modifyUsername ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                ) : (
                  <p>{data?.username}</p>
                )}
              </div>
            </div>
            <div>
              <p>Email</p>
              <p>{data?.email}</p>
            </div>
            <div>
              <p>Compte activé</p>
              <p>{data?.active ? "Oui" : "Non"}</p>
            </div>
            <div>
              <p>Newsletter</p>
              <div>
                <FontAwesomeIcon
                  className={
                    "account-modify-icon" +
                    (modifyNewsletter ? " account-icon-red" : "")
                  }
                  onClick={() => {
                    setModifyNewsletter(!modifyNewsletter);
                  }}
                  icon={"pen"}
                />
                {modifyNewsletter ? (
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={() => {
                      setNewsletter(!newsletter);
                    }}
                  />
                ) : (
                  <p>{data?.newsletter ? "Oui" : "Non"}</p>
                )}
              </div>
            </div>
            <div className="account-profile-avatar">
              <p>Photo de profil</p>
              <div>
                <FontAwesomeIcon
                  className={
                    "account-modify-icon" +
                    (modifyAvatar ? " account-icon-red" : "")
                  }
                  onClick={() => {
                    setModifyAvatar(!modifyAvatar);
                  }}
                  icon={"pen"}
                />
                {modifyAvatar ? (
                  previewAvatar ? (
                    <>
                      <img src={previewAvatar} alt="avatar" />
                      <FontAwesomeIcon
                        className="account-remove-avatar"
                        icon={"xmark"}
                        onClick={() => {
                          setAvatar(null);
                          setPreviewAvatar("");
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <label
                        htmlFor="account-change-avatar"
                        className="custom-file-upload"
                      >
                        + Nouvel avatar
                      </label>
                      <input
                        type="file"
                        id="account-change-avatar"
                        onChange={(event) => {
                          if (event.target.files && event.target.files[0]) {
                            setAvatar(event.target.files[0]);
                            setPreviewAvatar(
                              URL.createObjectURL(event.target.files[0])
                            );
                          }
                        }}
                      />
                    </>
                  )
                ) : (
                  <img src={data?.avatar} alt="avatar" />
                )}
              </div>
            </div>
            <button>Sauvegarder les modifications</button>
          </>
        )}
      </form>
    </main>
  );
};

export default Account;
