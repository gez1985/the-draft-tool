import React from "react";
import styles from "./styles.module.css";

const ValidationError = ({ msg }) => {
  if (!msg) {
    return null;
  }

  const getErrorMessage = () => {
    if (msg === "max team") {
      return "You can only select a maximum of two players from each team.";
    }
    if (msg === "full") {
      return "You can only select a maximum of fifteen players.";
    }
    if (msg === "max position") {
      return "You already have the maximum number of players in that position.";
    }
    if (msg === "min req") {
      return "You must pick at least 1 GK, 3 DF, 3 MF and 1 ST.";
    }
    return "this is the error message.";
  };

  return (
    <div className={styles.container}>
      <span className={styles.error}>{getErrorMessage()}</span>
    </div>
  );
};

export default ValidationError;
