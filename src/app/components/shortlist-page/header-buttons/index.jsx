import React from "react";
import styles from "./styles.module.css";
import { MdGroupOff } from "react-icons/md";
import { RiFileExcel2Line } from "react-icons/ri";
import { IconContext } from "react-icons";

const HeaderButtons = ({ setShowDiscarded }) => {
  return (
    <div className={styles.container}>
      <div className={styles.btn} onClick={() => setShowDiscarded(true)}>
        <div className={styles.icon}>
          <IconContext.Provider
            value={{
              color: "grey",
              size: "2rem",
            }}
          >
            <MdGroupOff />
          </IconContext.Provider>
        </div>
        <span className={styles.caption}>Discarded Players</span>
      </div>
      <button className={styles.btn} style={{ cursor: "not-allowed" }}>
        <div className={styles.icon}>
          <IconContext.Provider
            value={{
              color: "grey",
              size: "2rem",
            }}
          >
            <RiFileExcel2Line />
          </IconContext.Provider>
        </div>
        <span className={styles.caption}>Export (TBF)</span>
      </button>
    </div>
  );
};

export default HeaderButtons;
