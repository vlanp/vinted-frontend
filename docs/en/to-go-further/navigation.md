---
title: Navigation
description: Route management with React Router
nav: 2
id: f4b46e57b074b40ab34fe4c4902abbb8
---

## Declaring Pages / Routes with React Router

Inside the **Router** tag, a **Routes** tag is indicated. The latter contains a list of **Route** tags, associating each accessible route, via the **_path_** attribute, to each component to display, with the **_element_** attribute.

```tsx
<Router>
  ...
  <Routes>
    <Route path="/" element={<Home search={debounceSearch} />} />
    <Route path="/offers/:id" element={<Offer />} />
    <Route
      path="/signup"
      element={
        <SignUp
          userToken={userToken}
          setSignInModal={setSignInModal}
          setUserToken={setUserToken}
        />
      }
    />
    <Route
      path="/publish"
      element={
        <SellArticle token={userToken || ""} setSignInModal={setSignInModal} />
      }
    />
    <Route
      path="/payment"
      element={
        <CheckOut token={userToken || ""} setSignInModal={setSignInModal} />
      }
    />
    <Route path="/account-validation" element={<ValidAddressEmail />} />
    <Route path="/account" element={<Account userToken={userToken || ""} />} />
  </Routes>
  ...
</Router>
```

## Page Overview

This website consists of 7 pages:

- "/" : Displays the **Home** page, corresponding to the site's homepage

![Homepage](https://res.cloudinary.com/dwuvdquym/image/upload/v1753902417/vinted/docs/Home_page_uprbwb.png)

- "/signup" : Displays the **SignUp** page which allows account creation

![Sign up page](https://res.cloudinary.com/dwuvdquym/image/upload/v1753903165/vinted/docs/SignUp_page_u4pl3v.png)

- "/account-validation" : Displays the **ValidAddressEmail** page which allows validation of email address existence and ownership

![Email address validation page](https://res.cloudinary.com/dwuvdquym/image/upload/v1753904559/vinted/docs/ValidAddressEmail_page_r6lmzf.png)

- "/account" : Displays the **Account** page to access / modify current account information

![My account page](https://res.cloudinary.com/dwuvdquym/image/upload/v1753904669/vinted/docs/Account_page_e24vfw.png)

- "/publish" : Displays the **SellArticle** page which allows publishing an offer online (requires being logged in)

![Add listing page](https://res.cloudinary.com/dwuvdquym/image/upload/v1753903854/vinted/docs/SellArticle_page_noo2yt.png)

- "/offers/:id" : Displays the **Offer** page, containing information about the offer whose id has been provided

![Offer page](https://res.cloudinary.com/dwuvdquym/image/upload/v1753902909/vinted/docs/Offer_page_jvgwsq.png)

- "/payment" : Displays the **CheckOut** page which allows proceeding with payment / purchase of an offer's item (requires being logged in)

![Payment page](https://res.cloudinary.com/dwuvdquym/image/upload/v1753904019/vinted/docs/CheckOut_page_hkafdw.png)

## The Header

A **header** is added inside the **Router** tag and upstream from the **Routes** tag, which allows it to be displayed at the top of each of the site's pages.

![Site header](https://res.cloudinary.com/dwuvdquym/image/upload/v1753905580/vinted/docs/Header_erpkny.png)

```tsx
<Router>
  <Header
    signInModal={signInModal}
    setSignInModal={setSignInModal}
    userToken={userToken}
    setUserToken={setUserToken}
    search={search}
    setSearch={setSearch}
  />
  <Routes>...</Routes>
  ...
</Router>
```

## The Sign-In Modal

A **SignInModal** modal is added inside the **Router** tag downstream from the **Routes** tag. It appears only when the **_signInModal_** state is Truthy and, being in **_fixed_** position, it is placed in front of the page, preventing interactions with it as long as the modal remains open.

![Sign-in modal](https://res.cloudinary.com/dwuvdquym/image/upload/v1753906238/vinted/docs/SignInModal_pi0gks.png)

```tsx
const [signInModal, setSignInModal] = useState(false);

<Router>
  ...
  <Routes>...</Routes>
  {signInModal && (
    <SignInModal
      signInModal={signInModal}
      setSignInModal={setSignInModal}
      setUserToken={setUserToken}
    />
  )}
</Router>;
```

> The complete code is available [here](https://github.com/vlanp/vinted-frontend/blob/acfdf4065f788cd3c284c14d800078ba7905b787/src/App.tsx)

## Navigation Between Pages

<img src="https://res.cloudinary.com/dwuvdquym/image/upload/v1754256413/vinted/docs/vinted-frontend-navigation-dark-en_hhcoef.svg" alt="Navigation functionality" class="hidden dark:block" />

<img src="https://res.cloudinary.com/dwuvdquym/image/upload/v1754256413/vinted/docs/vinted-frontend-navigation-light-en_iq9gxi.svg" alt="Navigation functionality" class="block dark:hidden" />
