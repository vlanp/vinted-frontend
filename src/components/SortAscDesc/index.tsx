import "./sortAscDesc.css";
import { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SortAscDesc = ({
  text,
  state,
  setState,
}: {
  text: string;
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="custom-asc-desc-button"
      onClick={() => {
        setState(!state);
      }}
    >
      <p>{text}</p>
      <div className={"custom-base " + (state ? "activated" : "")}>
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
