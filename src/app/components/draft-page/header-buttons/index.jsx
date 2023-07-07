import React from "react";
import styles from "./styles.module.css";
import { MdGroups, MdPersonRemove, MdGroupOff } from "react-icons/md";
import { IconContext } from "react-icons";

const HeaderButtons = ({ setShowDeleted, setShowMyTeam, setShowDiscarded }) => {
  return (
    <div className={styles.container}>
      <div className={styles.btn} onClick={() => setShowMyTeam(true)}>
        <div className={styles.icon}>
          <IconContext.Provider
            value={{
              color: "grey",
              size: "2rem",
            }}
          >
            <MdGroups />
          </IconContext.Provider>
        </div>
        <span className={styles.caption}>My Team</span>
      </div>
      <div className={styles.btn} onClick={() => setShowDeleted(true)}>
        <div className={styles.icon}>
          <IconContext.Provider
            value={{
              color: "grey",
              size: "2rem",
            }}
          >
            <MdPersonRemove />
          </IconContext.Provider>
        </div>
        <span className={styles.caption}>Picked Players</span>
      </div>
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
    </div>
  );
};

export default HeaderButtons;
