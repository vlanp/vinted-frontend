---
title: Gestion des offres affichées
description: Filtre, tri, pagination et affichage des offres
nav: 4
id: 6c781597f3f787880ac5f89930634435
---

## Les filtres des offres

Deux méthodes de filtre des offres sont utilisées :

- Une barre de recherche par mots clés

![Barre de recherche](https://res.cloudinary.com/dwuvdquym/image/upload/v1754061895/vinted/docs/Offers_search_bar_rzgac4.png)

L'état **_search_** est mis à jour en temps réel à chaque caractère saisi par l'utilisateur dans le champ de recherche à l'aide de la propriété **_onChange_** du **input**. Pour optimiser les performances et réduire la charge serveur, une bibliothèque de debouncing est utilisée afin de créer un état **_debounceSearch_**.

Ce mécanisme de debouncing introduit un délai d'attente (généralement de 300 à 500ms) : l'état **_debounceSearch_** ne prend la valeur de l'état **_search_** qu'après une période d'inactivité de l'utilisateur. Cet état **_debounceSearch_** est utilisé pour la requête au serveur.

La requête de recherche n'est finalement déclenchée que lorsque l'utilisateur fait une pause dans sa saisie, garantissant ainsi que seules les recherches "intentionnelles" sont traitées.

Cette approche présente plusieurs avantages :

- **Réduction du nombre de requêtes** : évite les appels API inutiles pendant la saisie
- **Amélioration des performances** : limite la charge sur le serveur et le réseau
- **Meilleure expérience utilisateur** : évite les résultats de recherche qui clignotent pendant la frappe

```tsx
import { useDebounce } from "use-debounce";
```

```tsx
const [search, setSearch] = useState("");
const [debounceSearch] = useDebounce(search, 300);
```

```tsx
import { Dispatch, SetStateAction } from "react";
import "./searchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({
  className,
  search,
  setSearch,
}: {
  className: string;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className={"search " + className}>
      <FontAwesomeIcon icon={"magnifying-glass"} />
      <input
        type="text"
        placeholder="Recherche des articles"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
```

- Une barre permettant de filtrer sur une gamme de prix

![Barre de filtre par gamme de prix](https://res.cloudinary.com/dwuvdquym/image/upload/v1754062031/vinted/docs/Offers_price_filter_qf9lik.png)

La bibliothèque **_react-range_** est utilisée pour implémenter le filtre par gamme de prix sous forme de curseur interactif. L'utilisateur peut cliquer et faire glisser l'une ou l'autre des extrémités pour ajuster la plage de prix désirée.

Les curseurs ne peuvent pas sortir d'une certaine plage correspondante aux prix arrondis de l'offre la moins chère et de l'offre la plus chère. Ces valeurs sont déterminées en faisant une première requête au serveur à la création de la page, permettant de récupérer toutes les offres existantes.

```tsx
useEffect(() => {
  fetchData({
    endpoint: "/offers",
    setData: setAllData,
    setIsLoading: setIsLoading2,
  });
}, []);
```

```tsx
let lowerPrice = 100;
let higherPrice = lowerPrice + 5;
allData?.offers.forEach((value) => {
  if (!("product_name" in value)) {
    return;
  }
  if (value.product_price > higherPrice) {
    higherPrice = value.product_price;
  }
  if (value.product_price < lowerPrice) {
    lowerPrice = value.product_price;
  }
  lowerPrice = Math.floor(lowerPrice / 5) * 5;
  higherPrice = Math.ceil(higherPrice / 5) * 5;
  higherPrice += higherPrice === lowerPrice ? 5 : 0;
});
```

Lors de ces interactions, la propriété **_onChange_** est déclenchée en temps réel à chaque modification des valeurs minimum ou maximum, appelant la fonction **_setValues_** pour maintenir à jour l'état **_values_**. L'état **_values_** est à son tour utilisé dans la propriété **_values_** du composant **Range** afin d'assurer la synchronisation constante entre l'affichage visuel et l'état interne de l'application.

Conformément au principe de debouncing présenté précédemment, nous évitons d'effectuer des requêtes serveur pendant que l'utilisateur manipule activement les curseurs. Pour cela, le composant **Range** propose la propriété **_onFinalChange_**, qui se déclenche uniquement lorsque l'utilisateur termine son interaction. Cette fonction nous permet de récupérer les valeurs finales debouncées dont nous nous servons pour mettre à jour l'état **_finalValues_**.

```tsx
interface RangeValues {
  minValue: number;
  maxValue: number;
}
```

```tsx
const [values, setValues] = useState<RangeValues>();
const [finalValues, setFinalValues] = useState<RangeValues>();
```

```tsx
import "./filterRange.css";
import { Range, getTrackBackground } from "react-range";
import RangeValues from "../../interfaces/RangeValues";
import { Dispatch, SetStateAction } from "react";

const FilterRange = ({
  values,
  setValues,
  setFinalValues,
  minRange,
  maxRange,
  text,
}: {
  values: RangeValues;
  setValues: Dispatch<SetStateAction<RangeValues | undefined>>;
  setFinalValues: Dispatch<SetStateAction<RangeValues | undefined>>;
  minRange: number;
  maxRange: number;
  text: string;
}) => {
  return (
    <div className="filter-range">
      <p>{text}</p>
      <Range
        step={5}
        min={minRange}
        max={maxRange}
        values={[values.minValue, values.maxValue]}
        onChange={(values) =>
          setValues({ minValue: values[0], maxValue: values[1] })
        }
        onFinalChange={(values) =>
          setFinalValues({ minValue: values[0], maxValue: values[1] })
        }
        renderTrack={({ props, children }) => (
          <div
            className="filter-range-track"
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "5px",
                background: getTrackBackground({
                  values: [values.minValue, values.maxValue],
                  colors: ["#ccc", "#2baeb7", "#ccc"],
                  min: minRange,
                  max: maxRange,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div
            className="filter-range-thumb"
            aria-valuemax={props["aria-valuemax"]}
            aria-valuemin={props["aria-valuemin"]}
            aria-valuenow={props["aria-valuenow"]}
            draggable={props.draggable}
            key={props.key}
            onKeyUp={props.onKeyUp}
            onKeyDown={props.onKeyDown}
            ref={props.ref}
            role={props.role}
            style={{
              ...props.style,
            }}
          >
            <div className="thumb-current-value">
              {(index === 0 ? values.minValue : values.maxValue) + "€"}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default FilterRange;
```

## Le tri des offres

Le composant de tri peut être sous deux formes :

- Forme du tri croissant

![Tri croissant](https://res.cloudinary.com/dwuvdquym/image/upload/v1754065174/vinted/docs/Offers_ascending_sort_uwicoj.png)

- Forme du tri décroissant

![Tri décroissant](https://res.cloudinary.com/dwuvdquym/image/upload/v1754065175/vinted/docs/Offers_descending_sort_vx6skk.png)

La forme varie en fonction de l'état **_sort_** qui est mis à jour lors du déclenchement de la propriété **_onClick_** du composant de trie.

```tsx
import "./sortAscDesc.css";
import { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sort from "../../enums/Sort";

const SortAscDesc = ({
  text,
  sort,
  setSort,
}: {
  text: string;
  sort: Sort;
  setSort: Dispatch<SetStateAction<Sort>>;
}) => {
  return (
    <div
      className="custom-asc-desc-button"
      onClick={() => {
        setSort(sort === Sort.ASCENDING ? Sort.DESCENDING : Sort.ASCENDING);
      }}
    >
      <p>{text}</p>
      <div
        className={
          "custom-base " + (sort === Sort.ASCENDING ? "" : "activated")
        }
      >
        <div className="round">
          <FontAwesomeIcon icon={"arrow-up"} className="sort-arrow-up" />
          <FontAwesomeIcon icon={"arrow-down"} className="sort-arrow-down" />
        </div>
        <div className="skel"></div>
      </div>
    </div>
  );
};

export default SortAscDesc;
```

## La pagination

![Pagination des offres](https://res.cloudinary.com/dwuvdquym/image/upload/v1754065792/vinted/docs/Offers_pagination_no1epq.png)

```tsx
<PageHandling
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  maxPage={maxPage}
  setIsLoading={setIsLoading}
/>
```

Un composant a été créé pour gérer l'affichage de la pagination. Les numéros de pages affichés correspondent à ceux compris entre 1 et le nombre maximum de pages. En fonction du nombre de numéros de pages à afficher, certains peuvent être masqués et remplacés par des points de suspension (ellipse), selon la position de la page actuelle. La page actuelle est déterminée par le clic de l'utilisateur sur un numéro de page ou sur les boutons de navigation précédent/suivant. Le numéro de la page actuelle est initialement défini à 1.

```tsx
const [currentPage, setCurrentPage] = useState(1);
```

Le nombre maximum de pages est calculé en fonction du nombre d'offres récupérées depuis le serveur, du nombre d'offres à afficher par ligne et du nombre de lignes à afficher par page. Ces valeurs s'adaptent aux dimensions de l'écran.

```tsx
let limit;
if (width >= 1200) {
  limit = 4 * 5;
} else if (width >= 900) {
  limit = 4 * 4;
} else if (width >= 700) {
  limit = 5 * 3;
} else if (width >= 500) {
  limit = 6 * 2;
} else {
  limit = 10;
}

const maxPage = data ? Math.ceil(data.count / limit) : 0;
```

## Envoi des informations lors de la requête au serveur

Des query params sont ajoutés à l'endpoint afin de récupérer uniquement les offres respectant les filtres indiqués, triées dans le sens souhaité et faisant partie de la page actuelle.

```tsx
const data = await fetchData<DatasOffers>({
  endpoint:
    "/offers?page=" +
    currentPage +
    "&limit=" +
    limit +
    "&sort=" +
    sort +
    "&priceMin=" +
    (finalValues?.minValue || 0) +
    "&priceMax=" +
    (finalValues?.maxValue || Infinity) +
    "&title=" +
    search,
});
```

## Ajout de fausses offres pour améliorer l'affichage

Les offres sont affichées en **_display : flex_** avec l'attribut **_justify-content : space-around_**. Cela fonctionne bien quand il y a exactement le nombre maximum d'offres par ligne. Autrement, l'affichage des offres devient irrégulier.

```tsx
.home-articles {
  padding: 3rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  grid-template-columns: repeat(auto-fill, 100px);
  row-gap: 3rem;
}
```

![Affichage des offres sans fausses offres](https://res.cloudinary.com/dwuvdquym/image/upload/v1754251206/vinted/docs/Offers_without_fake_dcpq0q.png)

Afin de résoudre ce problème, la solution consiste à ajouter des offres fictives qui complètent la dernière ligne d'affichage. Ces éléments de remplissage sont invisibles pour l'utilisateur mais présents dans le flux, garantissant ainsi un alignement uniforme de la grille.

Selon la taille de la page, le nombre d'offres par ligne peut varier entre 1 et 5, il y aura donc besoin au maximum de 4 offres fictives afin de compléter la dernière ligne.

```tsx
interface DatasOffers {
  count: number;
  offers: Array<Offer | FakeOffer>;
}
```

```tsx
const dataCopy = { ...data };

for (let i = 0; i <= 3; i++) {
  dataCopy.offers.push({ _id: uuidv4() });
}

dataCopy && setData(dataCopy);
```

Nous voulons maintenant ajouter des **_class_** aux offres fictives pour que seules celles qui permettent réellement de compléter une ligne apparaissent dans le flux.

Le **_nbArticle_** étant le nombre de vrais articles.

```tsx
const limitIfFivePerRow = Math.ceil(nbArticle / 5) * 5;
const limitIfFourPerRow = Math.ceil(nbArticle / 4) * 4;
const limitIfThreePerRow = Math.ceil(nbArticle / 3) * 3;
const limitIfTwoPerRow = Math.ceil(nbArticle / 2) * 2;
const limitIfOnePerRow = nbArticle;

const hideIfFivePerRow =
  articleIndex + 1 > limitIfFivePerRow ? " hide-five-per-row" : "";
const hideIfFourPerRow =
  articleIndex + 1 > limitIfFourPerRow ? " hide-four-per-row" : "";
const hideIfThreePerRow =
  articleIndex + 1 > limitIfThreePerRow ? " hide-three-per-row" : "";
const hideIfTwoPerRow =
  articleIndex + 1 > limitIfTwoPerRow ? " hide-two-per-row" : "";
const hideIfOnePerRow =
  articleIndex + 1 > limitIfOnePerRow ? " hide-one-per-row" : "";
```

Afin de savoir s'il s'agit d'une vraie offre ou d'une offre fictive, nous vérifions l'existance d'un champ présent uniquement sur une vraie offre, par exemple **_product_name_**.

```tsx
return "product_name" in offer ? (
  <Link to={"/offers/" + offer._id} className="home-article">
    ...
  </Link>
) : (
  <section
    className={
      "home-article" +
      hideIfFivePerRow +
      hideIfFourPerRow +
      hideIfThreePerRow +
      hideIfTwoPerRow +
      hideIfOnePerRow
    }
  ></section>
);
```

Si par exemple nous avons 27 vraies offres avec au maximum 5 offres par ligne, cela donne :

limitIfFivePerRow = 30;  
limitIfFourPerRow = 28;  
limitIfThreePerRow = 27;  
limitIfTwoPerRow = 28;  
limitIfOnePerRow = 27;

Le nombre d'offres, avec les offres fictives, serait de 31. La première offre fictive serait la 28ème offre, et donc positionnée à l'index 27 et la dernière, la 31ème à la position 30.

Ainsi pour la 28ème offre :

hideIfFivePerRow = ""  
hideIfFourPerRow = ""  
hideIfThreePerRow = " hide-three-per-row"  
hideIfTwoPerRow = ""  
hideIfOnePerRow = " hide-one-per-row"

Ce qui donnerait :

```tsx
<section className={"home-article hide-three-per-row hide-one-per-row"} />
```

Les **_class_** ainsi ajoutées sont en **_display : none_** ou en **_display : flex_** en fonction de la taille de la page, qui influence le nombre d'offres à faire apparaître par ligne. En reprenant l'exemple ci-dessus, l'offre 28 (offre fictive) sera affichée si et seulement si il doit y avoir 5, 4 ou 2 offres par ligne.

```css
.hide-five-per-row {
  display: none;
}

@media (width < 1200px) {
  .home-article {
    width: 24%;
  }
  .hide-five-per-row {
    display: flex;
  }
  .hide-four-per-row {
    display: none;
  }
}

@media (width < 900px) {
  .home-article {
    width: 32%;
  }
  .hide-four-per-row {
    display: flex;
  }
  .hide-three-per-row {
    display: none;
  }
}

@media (width < 700px) {
  .home-article {
    width: 48%;
  }
  .hide-three-per-row {
    display: flex;
  }
  .hide-two-per-row {
    display: none;
  }
}

@media (width < 500px) {
  .home-article {
    width: 60%;
  }
  .hide-two-per-row {
    display: flex;
  }
  .hide-one-per-row {
    display: none;
  }
}
```

Cela nous permet d'obtenir le résultat suivant.

![Affichage des offres avec fausses offres](https://res.cloudinary.com/dwuvdquym/image/upload/v1754255416/vinted/docs/Offers_with_fake_ypjobm.png)
