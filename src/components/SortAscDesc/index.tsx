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
