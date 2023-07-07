import { useContext } from "react";
import styles from "./styles.module.css";
import ButtonSmall from "@/app/components/common/button-small";
import { PlayersContext } from "@/lib/context/players-context";

const ConfirmPick = ({ user, player, index, handleConfirm, handleCancel }) => {
  const players = useContext(PlayersContext);
  const shortlistCopy = Array.from(user.shortlist);
  shortlistCopy.splice(index, 0, player.id);

  const Player = ({ playerIndex, sortedPlayer }) => {
    const player = players.find(
      (player) => shortlistCopy[playerIndex] === player.id
    );

    if (index > -1 && player) {
      return (
        <div className={styles.player}>
          <span className={styles.index}>{playerIndex + 1}</span>
          <span className={styles.name}>{player.name}</span>
          <span className={styles.text}>{player.position.name}</span>
          <span className={styles.text}>{player.team.name}</span>
        </div>
      );
    }
    return null;
  };
  return (
    <div>
      <div className={styles.playersListWrapper}>
        <div className={styles.playersList}>
          <Player playerIndex={index - 2} />
          <Player playerIndex={index - 1} />
          <Player playerIndex={index} sortedPlayer={true} />
          <Player playerIndex={index + 1} />
          <Player playerIndex={index + 2} />
        </div>
      </div>
      <p>
        Add {player.name} in position {index + 1}
      </p>
      <ButtonSmall onClick={handleConfirm}>Yes</ButtonSmall>
      <ButtonSmall
        onClick={handleCancel}
        styleOverride={{ backgroundColor: "#b90e0a", marginLeft: "8px" }}
      >
        No
      </ButtonSmall>
    </div>
  );
};

export default ConfirmPick;
