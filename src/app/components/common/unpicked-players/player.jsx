import styles from "./player-styles.module.css";
import { useUser } from "@/lib/context/user-context";
import { MdAddBox, MdClose, MdDone } from "react-icons/md";
import { IconContext } from "react-icons";
import clsx from "clsx";
import ButtonClear from "../button-clear";

const Player = ({ player, handlePick, setDeletePlayer }) => {
  const { user, updateUser, updatingUser } = useUser();

  const handleAddToShortlist = () => {
    if (!updatingUser) {
      user.shortlist.push(player.id);
      updateUser(user);
    }
  };

  if (!player || !user) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.nameWrapper}>
          <span className={styles.text}>{player.name}</span>
          <span className={styles.pointsLabel}>({player.points})</span>
        </div>
        <div className={styles.infoWrapper}>
          <span className={styles.info}>{player.position.name}</span>
          <span className={styles.info}>{player.team.name}</span>
        </div>
        <div className={styles.actionsWrapper}>
          {user.shortlist.includes(player.id) ? (
            <ButtonClear disabled={updatingUser}>
              <IconContext.Provider
                value={{
                  color: "lightgrey",
                  size: "2.5rem",
                  className: clsx(styles.icon, styles.disabled),
                }}
              >
                <MdAddBox />
              </IconContext.Provider>
            </ButtonClear>
          ) : (
            <ButtonClear onClick={handleAddToShortlist} disabled={updatingUser}>
              <IconContext.Provider
                value={{
                  color: "#388087",
                  size: "2.5rem",
                  className: styles.icon,
                }}
              >
                <MdAddBox />
              </IconContext.Provider>
            </ButtonClear>
          )}
          <ButtonClear
            onClick={() => handlePick(player)}
            disabled={updatingUser}
          >
            <IconContext.Provider
              value={{
                color: "#52ab98",
                size: "2.5rem",
                className: styles.icon,
              }}
            >
              <MdDone />
            </IconContext.Provider>
          </ButtonClear>
          <ButtonClear
            onClick={() => setDeletePlayer(player)}
            disabled={updatingUser}
          >
            <IconContext.Provider
              value={{
                color: "#b90e0a",
                size: "2.5rem",
                className: styles.icon,
              }}
            >
              <MdClose />
            </IconContext.Provider>
          </ButtonClear>
        </div>
      </div>
    </div>
  );
};

export default Player;
