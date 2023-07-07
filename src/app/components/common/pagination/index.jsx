import React from "react";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { IconContext } from "react-icons";
import styles from "./styles.module.css";

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(items / pageSize);

  if (pagesCount === 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div className={styles.container}>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage <= 1 ? true : false}
        className={styles.pageButton}
      >
        <IconContext.Provider
          value={{
            color: "#d3d3d3",
            size: "2.5rem",
          }}
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </IconContext.Provider>
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 ? true : false}
        className={styles.pageButton}
      >
        <IconContext.Provider
          value={{
            color: "#d3d3d3",
            size: "2.5rem",
          }}
        >
          <MdOutlineKeyboardArrowLeft />
        </IconContext.Provider>
      </button>
      <span className={styles.caption}>
        page {currentPage} of {pagesCount}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= pagesCount ? true : false}
        className={styles.pageButton}
      >
        <IconContext.Provider
          value={{
            color: "#d3d3d3",
            size: "2.5rem",
          }}
        >
          <MdOutlineKeyboardArrowRight />
        </IconContext.Provider>
      </button>
      <button
        onClick={() => onPageChange(pagesCount)}
        disabled={currentPage >= pagesCount ? true : false}
        className={styles.pageButton}
      >
        <IconContext.Provider
          value={{
            color: "#d3d3d3",
            size: "2.5rem",
          }}
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </IconContext.Provider>
      </button>
    </div>
  );
};

export default Pagination;
