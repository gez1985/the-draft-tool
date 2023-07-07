import { useState } from "react";
import styles from "./styles.module.css";
import ButtonSmallDark from "../../common/button-small-dark";
import { useUser } from "@/lib/context/user-context";

const DeletedPlayers = ({ players }) => {
  const [name, setName] = useState("");
  const { restoreDeletedPlayer, updatingUser } = useUser();

  const namedPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(name.toLowerCase())
  );

  const handleRestoreClick = (playerId) => {
    restoreDeletedPlayer(playerId);
    setName("");
  };

  if (players.length < 1) {
    return (
      <div className={styles.container}>
        <span>You have not marked any players as picked.</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="Search by name:"
          className={styles.search}
          onChange={(e) => setName(e.target.value)}
          value={name}
        ></input>
      </div>
      <div className={styles.listWrapper}>
        {namedPlayers.map((player, index) => (
          <div key={index} className={styles.player}>
            <span className={styles.name}>{player.name}</span>
            <ButtonSmallDark
              onClick={() => handleRestoreClick(player.id)}
              disabled={updatingUser}
            >
              Restore
            </ButtonSmallDark>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeletedPlayers;
