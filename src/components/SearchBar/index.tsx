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
