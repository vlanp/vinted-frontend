import { Dispatch, SetStateAction } from "react";
import "./pageHandling.css";
import { v4 as uuidv4 } from "uuid";

const PageHandling = ({
  currentPage,
  setCurrentPage,
  maxPage,
  setIsLoading,
}: {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  maxPage: number;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const displayList: Array<{ display: string; className: string }> = [];
  if (maxPage <= 6) {
    for (let i = 1; i <= maxPage; i++) {
      displayList.push({
        display: i.toString(),
        className: "page-number" + (i === currentPage ? " page-highlight" : ""),
      });
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        displayList.push({
          display: i.toString(),
          className:
            "page-number" + (i === currentPage ? " page-highlight" : ""),
        });
      }
      displayList.push({ display: "...", className: "page-triple-dot" });
      displayList.push({
        display: maxPage.toString(),
        className: "page-number",
      });
    } else if (currentPage >= maxPage - 3) {
      displayList.push({ display: "1", className: "page-number" });
      displayList.push({ display: "...", className: "page-triple-dot" });
      for (let i = maxPage - 3; i <= maxPage; i++) {
        displayList.push({
          display: i.toString(),
          className:
            "page-number" + (i === currentPage ? " page-highlight" : ""),
        });
      }
    } else {
      displayList.push({ display: "1", className: "page-number" });
      displayList.push({ display: "...", className: "page-triple-dot" });
      displayList.push({
        display: currentPage.toString(),
        className: "page-number page-highlight",
      });
      displayList.push({
        display: (currentPage + 1).toString(),
        className: "page-number",
      });
      displayList.push({ display: "...", className: "page-triple-dot" });
      displayList.push({
        display: maxPage.toString(),
        className: "page-number",
      });
    }
  }

  if (maxPage > 1) {
    displayList.unshift({
      display: "<",
      className:
        "page-previous-page" +
        (currentPage === 1 ? " page-next-previous-disabled" : ""),
    });
    displayList.push({
      display: ">",
      className:
        "page-next-page" +
        (currentPage === maxPage ? " page-next-previous-disabled" : ""),
    });
  }

  return (
    <div className="page-handling">
      {displayList.map((value) => {
        return (
          <p
            onClick={() => {
              if (
                value.className.includes("page-number") &&
                !value.className.includes("page-highlight")
              ) {
                setCurrentPage(Number(value.display));
                setIsLoading(true);
              }
              if (
                value.className.includes("page-previous-page") &&
                !value.className.includes("page-next-previous-disabled")
              ) {
                setCurrentPage(currentPage - 1);
                setIsLoading(true);
              }
              if (
                value.className.includes("page-next-page") &&
                !value.className.includes("page-next-previous-disabled")
              ) {
                setCurrentPage(currentPage + 1);
                setIsLoading(true);
              }
            }}
            className={value.className}
            key={uuidv4()}
          >
            {value.display}
          </p>
        );
      })}
    </div>
  );
};

export default PageHandling;
