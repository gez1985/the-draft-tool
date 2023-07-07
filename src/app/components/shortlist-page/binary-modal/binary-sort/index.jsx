import { useEffect, useState, useContext } from "react";
import { PlayersContext } from "@/lib/context/players-context";
import styles from "./styles.module.css";
import Player from "./player";
import ConfirmPick from "./confirm-pick";
import { useUser } from "@/lib/context/user-context";

const BinarySort = ({ user, player, close }) => {
  const players = useContext(PlayersContext);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(user.shortlist.length - 1);
  const [compareIndex, setCompareIndex] = useState(
    Math.floor((startIndex + endIndex) / 2)
  );
  const [confirm, setConfirm] = useState(false);
  const [finalIndex, setFinalIndex] = useState();

  const { updateUser } = useUser();

  useEffect(() => {
    setCompareIndex(Math.floor((startIndex + endIndex) / 2));
  }, [startIndex, endIndex]);

  useEffect(() => {
    resetState();
  }, [player]);

  const comparePlayer = players.find(
    (player) => player.id === user.shortlist[compareIndex]
  );

  const resetState = () => {
    setConfirm(false);
    setFinalIndex();
    setStartIndex(0);
    setEndIndex(user.shortlist.length - 1);
  };

  const confirmAddPlayer = async () => {
    user.shortlist.splice(finalIndex, 0, player.id);
    updateUser(user);
    resetState();
    close();
  };

  const handleCancelConfirm = () => {
    resetState();
    close();
  };

  const chooseSorted = async () => {
    if (endIndex === compareIndex) {
      setConfirm(true);
      setFinalIndex(compareIndex + 1);
    }
    setStartIndex(compareIndex + 1);
  };

  const chooseUnsorted = async () => {
    if (startIndex === compareIndex) {
      setConfirm(true);
      setFinalIndex(compareIndex);
    }
    setEndIndex(compareIndex - 1);
  };

  if (confirm) {
    return (
      <ConfirmPick
        player={player}
        index={finalIndex}
        handleConfirm={confirmAddPlayer}
        handleCancel={handleCancelConfirm}
        user={user}
      />
    );
  }

  return (
    <>
      <p className={styles.caption}>Select your preferred player:</p>
      <div className={styles.container}>
        <div className={styles.selectWrapper}>
          <Player player={player} onClick={chooseUnsorted} />
          <Player player={comparePlayer} onClick={chooseSorted} />
        </div>
      </div>
    </>
  );
};

export default BinarySort;
