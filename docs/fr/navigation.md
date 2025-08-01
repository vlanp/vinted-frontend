---
title: Navigation
description: Gestion des routes avec React Router
nav: 2
id: f4b46e57b074b40ab34fe4c4902abbb8
---

## Déclaration des pages / routes avec React Router

Dans la balise **Router** est indiquée une balise **Routes**. Cette dernière contient une liste de balise **Route**, associant chaque route accessible, via l'attribut **_path_**, à chaque composant à afficher, avec l'attribut **_element_**.

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

## Présentation des pages

Ce site internet est composé de 7 pages :

- "/" : Affiche la page **Home**, correspondant à la page d'acceuil du site

![Page d'acceuil](https://res.cloudinary.com/dwuvdquym/image/upload/v1753902417/vinted/docs/Home_page_uprbwb.png)

- "/signup" : Affiche la page **SignUp** qui permet de créer un compte

![Page d'inscription](https://res.cloudinary.com/dwuvdquym/image/upload/v1753903165/vinted/docs/SignUp_page_u4pl3v.png)

- "/account-validation" : Affiche la page **ValidAddressEmail** qui permet de valider l'existence et l'appartenance d'une adresse email

![Page de validation d'adresse email](https://res.cloudinary.com/dwuvdquym/image/upload/v1753904559/vinted/docs/ValidAddressEmail_page_r6lmzf.png)

- "/account" : Affiche la page **Account** pour accéder aux / modifier les informations du compte actuel

![Page mon compte](https://res.cloudinary.com/dwuvdquym/image/upload/v1753904669/vinted/docs/Account_page_e24vfw.png)

- "/publish" : Affiche la page **SellArticle** qui permet de mettre en ligne une offre (nécessite d'être connecté)

![Page d'ajout d'annonces](https://res.cloudinary.com/dwuvdquym/image/upload/v1753903854/vinted/docs/SellArticle_page_noo2yt.png)

- "/offers/:id" : Affiche la page **Offer**, contenant les informations de l'offre dont l'id a été fourni

![Page d'une offre](https://res.cloudinary.com/dwuvdquym/image/upload/v1753902909/vinted/docs/Offer_page_jvgwsq.png)

- "/payment" : Affiche la page **CheckOut** qui permet de procéder au paiement / achat de l'article d'une offre (nécessite d'être connecté)

![Page de paiement](https://res.cloudinary.com/dwuvdquym/image/upload/v1753904019/vinted/docs/CheckOut_page_hkafdw.png)

## Le header

Un **header** est ajouté dans la balise **Router** et en amont de la balise **Routes**, ce qui lui permet d'être afficher en haut de chacune des pages du site.

![Header du site](https://res.cloudinary.com/dwuvdquym/image/upload/v1753905580/vinted/docs/Header_erpkny.png)

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

## La modale de connexion

Une modale **SignInModal** est ajoutée dans la balise **Router** en aval de la balise **Routes**. Elle apparait uniquement quand l'état **_signInModal_** est Truthy et, étant en position **_fixed_**, elle vient se placer devant la page, empêchant les intéractions avec cette dernière tant que la modale reste ouverte.

![Modale de connexion](https://res.cloudinary.com/dwuvdquym/image/upload/v1753906238/vinted/docs/SignInModal_pi0gks.png)

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

> Le code complet est disponible [ici](https://github.com/vlanp/vinted-frontend/blob/acfdf4065f788cd3c284c14d800078ba7905b787/src/App.tsx)

## Navigation entre les pages

<img src="https://res.cloudinary.com/dwuvdquym/image/upload/v1753997453/vinted/docs/vinted-frontend-navigation-dark-fr_smxjce.svg" alt="Fonctionnement de la navigation" class="hidden dark:block" />

<img src="https://res.cloudinary.com/dwuvdquym/image/upload/v1753997451/vinted/docs/vinted-frontend-navigation-light-fr_nchb3a.svg" alt="Fonctionnement de la navigation" class="block dark:hidden" />
