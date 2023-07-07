import React from "react";
import styles from "./team-section.module.css";
import { useUser } from "@/lib/context/user-context";
import ButtonSmallDark from "../button-small-dark";
import clsx from "clsx";

const TeamSection = ({ title, players }) => {
  const { removeFromMyTeam, updatingUser } = useUser();

  const handleRemoveClick = (playerId) => {
    if (!updatingUser) {
      removeFromMyTeam(playerId);
    }
  };

  const Player = ({ player, index }) => {
    return (
      <div className={styles.playerWrapper}>
        <span className={styles.name}>
          {index + 1}. {player.name}
        </span>
        <span className={clsx(styles.name, styles.show)}>
          {player.position.name}
        </span>
        <span className={clsx(styles.name, styles.show)}>
          {player.team.name}
        </span>
        <ButtonSmallDark
          onClick={() => handleRemoveClick(player.id)}
          disabled={updatingUser}
        >
          Remove
        </ButtonSmallDark>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>{title}</h5>
      <div className={styles.playersList}>
        {players.map((player, index) => (
          <Player player={player} index={index} key={player.id} />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
