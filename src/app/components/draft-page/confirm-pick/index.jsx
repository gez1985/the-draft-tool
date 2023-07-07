import React from "react";
import styles from "./styles.module.css";
import ButtonSmallDark from "../../common/button-small-dark";
import ButtonSmall from "../../common/button-small";

const ConfirmPick = ({ player, handleCancel, handlePick }) => {
  if (!player) {
    return null;
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>{player.code}</h1>
      <span>Select {player.name} for your team?</span>
      <div className={styles.btnWrapper}>
        <ButtonSmall
          styleOverride={{ margin: "6px" }}
          onClick={() => handlePick(player)}
        >
          Pick Player
        </ButtonSmall>
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

export default ConfirmPick;
