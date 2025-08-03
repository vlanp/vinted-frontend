---
title: Authentication
description: Route security and user access management
nav: 3
id: b6119cf2d6ad9cfe74984a025a002887
---

## Account Creation

3 states have been created to contain the information to send to the server for account creation: username, email address, and password. A 4th state has been created to allow password confirmation and ensure there are no user input errors.

```tsx
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmedPassword, setConfirmedPassword] = useState("");
```

4 **inputs** are created to update the 4 associated states, by linking the **_onChange_** functions of the **inputs** with the state update functions. Additionally, the **_value_** properties are associated with the states to ensure that the display always reflects the state values.

```tsx
<>
  <input
    type="text"
    placeholder="Username"
    value={username}
    onChange={(event) => {
      setUsername(event.target.value);
    }}
  />
  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(event) => {
      setEmail(event.target.value);
    }}
  />
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(event) => {
      setPassword(event.target.value);
    }}
  />
  <input
    type="password"
    placeholder="Confirm password"
    value={confirmedPassword}
    onChange={(event) => {
      setConfirmedPassword(event.target.value);
    }}
  />
</>
```

The **inputs** are placed in a **form**, and a button controls data submission by triggering the **_onSubmit_** of the **form** which in turn calls the **_handleSubmit_** function.

```tsx
<form onSubmit={handleSubmit}>
  ... // Inputs
  <button>Sign Up</button>
</form>
```

A new state is created to contain potential errors that may occur during form submission.

```tsx
const [errorMessage, setErrorMessage] = useState<string>("");
```

Submission is done in several steps:

- Call the **_preventDefault_** function on the **_event_** to prevent the browser from changing pages during form submission
- The **_errorMessage_** state is reset to its initial state because if an error message existed, it is no longer relevant following the submission of a new form
- Checks are made on the password and username from the associated states. In case a problem is detected, a popup is displayed to alert the user about the encountered issue
- A json is created with the contents of the states and is sent as body in the **_post_** request to the server

If no exception is raised during the request with **_axios_**, this means that the response contains a status corresponding to success. We then verify that the response indeed contains the data of the created account then:

- We update the state containing the user's token, which will be used to prove that the user is authenticated
- We update the **_userToken_** cookie to contain the user's token, which can be used later to maintain the account connection despite site restart and state reset
- We redirect the user to the email address validation page. An unverified email address will prevent the user from publishing offers or making purchases. This address does not trigger any action, it only informs the user of the email address that needs to be verified.

In case of an exception raised following the request with **_axios_**, or a response not containing the expected data, we update the **_errorMessage_** state with the information we have at our disposal.

```tsx
const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setErrorMessage("");
  if (confirmedPassword !== password) {
    return alert("The 2 passwords do not match");
  }
  if (password.length === 0) {
    return alert("The password is empty");
  }
  if (username.length === 0) {
    return alert("The username is empty");
  }
  const json = {
    email,
    username,
    password,
    newsletter,
  };

  try {
    const response = await axios.post(
      import.meta.env.VITE_VINTED_API_URL + "/user/signup",
      json
    );
    if ("_id" in response.data) {
      Cookies.set("userToken", response.data.token);
      setUserToken(response.data.token);
      navigate("/account-validation", { state: { email } });
    } else {
      setErrorMessage("An unknown error occurred. Please try again later");
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      setErrorMessage(
        (error.response?.data as MyError)?.message || "Unknown server error"
      );
    } else {
      setErrorMessage("Unknown server error");
    }
  }
};
```

If an error message has been indicated, it is displayed to the user at the bottom of the form.

```tsx
<form onSubmit={handleSubmit}>
  ... // Inputs
  { errorMessage && <p>{errorMessage}</p>;}
  <button>Sign Up</button>
</form>
```

> The complete code for account creation is available [here](https://github.com/vlanp/vinted-frontend/blob/7ad2c186fbe153b2302bad5f9f428a9619381a02/src/pages/SignUp/index.tsx).

## Account Login

The logic used for account login is very similar to that of account creation, except that there are now only 2 states submitted by the form (email and password) instead of 4.

> The complete code for account login is available [here](https://github.com/vlanp/vinted-frontend/blob/095b37550a1137a766a1c48c194b749b2e3dd606/src/components/SignInModal/index.tsx)

## Route Security

The routes that the user should not access without being authenticated are:

- The "/payment" route
- The "/publish" route

If the user accesses them without being authenticated, an empty page is displayed, and the login modal is opened.

```tsx
useEffect(() => {
  userToken || setSignInModal(true);
}, [userToken, setSignInModal]);
```

```tsx
  return token ? ... : <></>;
```

The modal component retrieves the current route, and when it is closed, checks if the current route is part of the protected routes. If so, the user is redirected to the home page.

```tsx
import { useLocation } from "react-router-dom";
```

```tsx
const unacceptedLocation = ["/publish", "/payment"];
```

```tsx
const location = useLocation().pathname;
```

```tsx
<FontAwesomeIcon
  className="close"
  icon={"xmark"}
  onClick={() => {
    setSignInModal(!signInModal);
    if (unacceptedLocation.includes(location)) {
      navigate("/");
    }
  }}
/>
```

Access to the "/account" route by an unauthenticated user displays an error message.

The protection implemented on the frontend (user interface) only constitutes a secondary security measure, as a user can always manually manipulate data stored in cookies or localStorage to impersonate an authenticated user. The real security validation therefore takes place on the server side (backend), which is responsible for verifying the authenticity and validity of the authentication token before authorizing access to protected resources.
