import React from "react";
import styles from "./styles.module.css";
import TeamSection from "./team-section";

const MyTeamModal = ({ players }) => {
  const keepers = players.filter((player) => player.position.name === "GK");
  const defenders = players.filter((player) => player.position.name === "DF");
  const midfielders = players.filter(
    (player) => player.position.name === "MF" || player.position.name === "DM"
  );
  const forwards = players.filter((player) => player.position.name === "FW");

  return (
    <div className={styles.container}>
      <div className={styles.listWrapper}>
        <TeamSection title="GK" players={keepers} />
        <TeamSection title="DF" players={defenders} />
        <TeamSection title="MF" players={midfielders} />
        <TeamSection title="FW" players={forwards} />
      </div>
    </div>
  );
};

export default MyTeamModal;
