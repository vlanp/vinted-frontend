---
title: Displayed Offers Management
description: Filter, sort, pagination and display of offers
nav: 4
id: 6c781597f3f787880ac5f89930634435
---

## Offer Filters

Two offer filtering methods are used:

- A keyword search bar

![Search bar](https://res.cloudinary.com/dwuvdquym/image/upload/v1754061895/vinted/docs/Offers_search_bar_rzgac4.png)

The **_search_** state is updated in real-time with each character typed by the user in the search field using the **_onChange_** property of the **input**. To optimize performance and reduce server load, a debouncing library is used to create a **_debounceSearch_** state.

This debouncing mechanism introduces a wait delay (typically 300 to 500ms): the **_debounceSearch_** state only takes the value of the **_search_** state after a period of user inactivity. This **_debounceSearch_** state is used for the server query.

The search query is finally triggered only when the user pauses in their typing, ensuring that only "intentional" searches are processed.

This approach has several advantages:

- **Reduction in the number of requests**: avoids unnecessary API calls during typing
- **Performance improvement**: limits load on the server and network
- **Better user experience**: avoids search results that flicker during typing

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
        placeholder="Search for items"
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

- A bar for filtering by price range

![Price range filter bar](https://res.cloudinary.com/dwuvdquym/image/upload/v1754062031/vinted/docs/Offers_price_filter_qf9lik.png)

The **_react-range_** library is used to implement the price range filter as an interactive slider. The user can click and drag either end to adjust the desired price range.

The sliders cannot go outside a certain range corresponding to the rounded prices of the cheapest offer and the most expensive offer. These values are determined by making an initial request to the server when the page is created, allowing retrieval of all existing offers.

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

During these interactions, the **_onChange_** property is triggered in real-time with each modification of the minimum or maximum values, calling the **_setValues_** function to keep the **_values_** state up to date. The **_values_** state is in turn used in the **_values_** property of the **Range** component to ensure constant synchronization between the visual display and the internal state of the application.

In accordance with the debouncing principle presented earlier, we avoid making server requests while the user is actively manipulating the sliders. For this, the **Range** component offers the **_onFinalChange_** property, which is triggered only when the user finishes their interaction. This function allows us to retrieve the final debounced values which we use to update the **_finalValues_** state.

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

## Offer Sorting

The sorting component can be in two forms:

- Ascending sort form

![Ascending sort](https://res.cloudinary.com/dwuvdquym/image/upload/v1754065174/vinted/docs/Offers_ascending_sort_uwicoj.png)

- Descending sort form

![Descending sort](https://res.cloudinary.com/dwuvdquym/image/upload/v1754065175/vinted/docs/Offers_descending_sort_vx6skk.png)

The form varies based on the **_sort_** state which is updated when the **_onClick_** property of the sort component is triggered.

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

## Pagination

![Offer pagination](https://res.cloudinary.com/dwuvdquym/image/upload/v1754065792/vinted/docs/Offers_pagination_no1epq.png)

```tsx
<PageHandling
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  maxPage={maxPage}
  setIsLoading={setIsLoading}
/>
```

A component has been created to handle pagination display. The page numbers displayed correspond to those between 1 and the maximum number of pages. Depending on the number of page numbers to display, some may be hidden and replaced with ellipsis, depending on the position of the current page. The current page is determined by the user clicking on a page number or on the previous/next navigation buttons. The current page number is initially set to 1.

```tsx
const [currentPage, setCurrentPage] = useState(1);
```

The maximum number of pages is calculated based on the number of offers retrieved from the server, the number of offers to display per row, and the number of rows to display per page. These values adapt to screen dimensions.

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

## Sending Information During Server Request

Query params are added to the endpoint to retrieve only offers that respect the indicated filters, sorted in the desired direction and belonging to the current page.

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

## Adding Fake Offers to Improve Display

Offers are displayed in **_display: flex_** with the **_justify-content: space-around_** attribute. This works well when there is exactly the maximum number of offers per row. Otherwise, the display of offers becomes irregular.

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

![Offer display without fake offers](https://res.cloudinary.com/dwuvdquym/image/upload/v1754251206/vinted/docs/Offers_without_fake_dcpq0q.png)

To solve this problem, the solution is to add fake offers that complete the last display row. These filler elements are invisible to the user but present in the flow, ensuring uniform grid alignment.

Depending on the page size, the number of offers per row can vary between 1 and 5, so a maximum of 4 fake offers will be needed to complete the last row.

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

We now want to add **_classes_** to fake offers so that only those that actually help complete a row appear in the flow.

The **_nbArticle_** being the number of real articles.

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

To know if it's a real offer or a fake offer, we check the existence of a field present only on a real offer, for example **_product_name_**.

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

If for example we have 27 real offers with a maximum of 5 offers per row, this gives:

limitIfFivePerRow = 30;  
limitIfFourPerRow = 28;  
limitIfThreePerRow = 27;  
limitIfTwoPerRow = 28;  
limitIfOnePerRow = 27;

The number of offers, with fake offers, would be 31. The first fake offer would be the 28th offer, and thus positioned at index 27 and the last, the 31st at position 30.

Thus for the 28th offer:

hideIfFivePerRow = ""  
hideIfFourPerRow = ""  
hideIfThreePerRow = " hide-three-per-row"  
hideIfTwoPerRow = ""  
hideIfOnePerRow = " hide-one-per-row"

Which would give:

```tsx
<section className={"home-article hide-three-per-row hide-one-per-row"} />
```

The **_classes_** thus added are in **_display: none_** or in **_display: flex_** depending on the page size, which influences the number of offers to display per row. Taking the example above, offer 28 (fake offer) will be displayed if and only if there should be 5, 4 or 2 offers per row.

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

This allows us to obtain the following result.

![Offer display with fake offers](https://res.cloudinary.com/dwuvdquym/image/upload/v1754255416/vinted/docs/Offers_with_fake_ypjobm.png)
