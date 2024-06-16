import "./searchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ className }: { className: string }) => {
  return (
    <div className={"search " + className}>
      <FontAwesomeIcon icon={"magnifying-glass"} />
      <input type="text" placeholder="Recherche des articles" />
    </div>
  );
};

export default SearchBar;
