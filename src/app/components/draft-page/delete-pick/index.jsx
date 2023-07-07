import React from "react";
import styles from "./styles.module.css";
import ButtonSmallDark from "../../common/button-small-dark";

const DeletePick = ({ player, handleCancel, handleDelete }) => {
  if (!player) {
    return null;
  }
  return (
    <div className={styles.container}>
      <span className={styles.caption}>
        Set <span className={styles.name}>{player.name}</span> as drafted?
      </span>
      <div className={styles.btnWrapper}>
        <ButtonSmallDark
          styleOverride={{ margin: "6px" }}
          onClick={() => handleDelete(player)}
        >
          Drafted
        </ButtonSmallDark>
        <ButtonSmallDark
          styleOverride={{ backgroundColor: "#b90e0a", margin: "6px" }}
          onClick={handleCancel}
        >
          Cancel
        </ButtonSmallDark>
      </div>
    </div>
  );
};

export default DeletePick;
