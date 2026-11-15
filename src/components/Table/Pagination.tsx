import React from "react";
import { Button, KeyboardArrowRightIcon, KeyboardArrowLeftIcon } from "../ui";
import useStrings from "../../hooks/useStrings.hook";
import styles from "./Pagination.module.css";

const getPages = ({
  currentPage,
  numPages,
  setCurrentPage,
}: {
  currentPage: number;
  numPages: number;
  setCurrentPage: Function;
}) => {
  // let i = currentPage - 4 > 0 ? currentPage - 4 : 0;
  const pages = [];
  const minStart = Math.max(numPages - 5, 0);
  const minEnd = Math.min(4, numPages - 1);
  const targetStart = Math.max(currentPage - 2, 0);
  const targetEnd = Math.min(currentPage + 2, numPages - 1);
  const start = Math.min(targetStart, minStart);
  const end = Math.max(targetEnd, minEnd);
  for (let i = start; i <= end; i += 1) {
    pages.push(
      i === currentPage ? (
        <Button
          className={`${styles.styledPage} ${styles.styledCurrentPage}`}
          key={i}
          onClick={i === currentPage ? () => {} : () => setCurrentPage(i)}
        >
          {i + 1}
        </Button>
      ) : (
        <Button
          className={styles.styledPage}
          key={i}
          onClick={i === currentPage ? () => {} : () => setCurrentPage(i)}
        >
          {i + 1}
        </Button>
      ),
    );
  }
  return pages;
};

const Pagination = ({
  currentPage,
  nextPage,
  prevPage,
  setCurrentPage,
  numPages,
  pageLength,
  length,
  place,
}: {
  currentPage: number;
  nextPage: (e: React.MouseEvent) => void;
  prevPage: (e: React.MouseEvent) => void;
  setCurrentPage: Function;
  numPages: number;
  pageLength: number;
  length: number;
  place: string;
}) => {
  const strings = useStrings();
  if (numPages > 1) {
    const isTop = place === "top";
    return (
      <div
        className={`${styles.styledContainer} ${isTop ? styles.styledContainerTop : ""}`}
      >
        <div
          className={`${styles.styledPagination} ${isTop ? styles.styledPaginationTop : ""}`}
        >
          {currentPage > 0 && (
            <Button
              className={styles.styledPage}
              onClick={() => setCurrentPage(0)}
            >
              {strings.pagination_first}
            </Button>
          )}
          <div>
            {currentPage > 0 && (
              <Button
                className={`${styles.styledArrow} ${styles.styledArrowButton}`}
                onClick={currentPage > 0 ? prevPage : () => {}}
              >
                <KeyboardArrowLeftIcon className={styles.styledArrow} />
              </Button>
            )}
            {currentPage > 2 && numPages > 2 && (
              <Button
                className={`${styles.styledPage} ${styles.styledCurrentPage}`}
                disabled
              >
                ...
              </Button>
            )}
            {getPages({ currentPage, numPages, setCurrentPage })}
            {numPages > currentPage + 3 && (
              <Button
                className={`${styles.styledPage} ${styles.styledCurrentPage}`}
                disabled
              >
                ...
              </Button>
            )}
            {currentPage < numPages - 1 && (
              <Button
                className={`${styles.styledArrow} ${styles.styledArrowButton}`}
                onClick={currentPage < numPages - 1 ? nextPage : () => {}}
              >
                <KeyboardArrowRightIcon className={styles.styledArrow} />
              </Button>
            )}
          </div>
          {currentPage < numPages - 1 && (
            <Button
              className={styles.styledPage}
              onClick={() => setCurrentPage(numPages - 1)}
            >
              {strings.pagination_last}
            </Button>
          )}
        </div>
        {place === "bot" && (
          <div className={styles.styledInfo}>
            {(pageLength * currentPage + 1).toLocaleString("en-US")}
            {" - "}
            {Math.min(
              pageLength * currentPage + pageLength,
              length,
            ).toLocaleString("en-US")}{" "}
            {strings.pagination_of} {length.toLocaleString("en-US")}
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default Pagination;
