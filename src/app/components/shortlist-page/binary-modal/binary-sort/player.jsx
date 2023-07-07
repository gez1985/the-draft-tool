import React from "react";
import styles from "./styles.module.css";

const Player = ({ player, onClick }) => {
  if (!player) {
    return null;
  }
  return (
    <div className={styles.playerContainer} onClick={onClick}>
      <span className={styles.name}>{player.name}</span>
      <span className={styles.text}>{player.position.name}</span>
      <span className={styles.text}>{player.team.name}</span>
    </div>
  );
};

export default Player;
