import React from "react";
import styles from "./styles.module.css";
import EmptyShortlist from "./empty-shortlist";
import BinarySort from "./binary-sort";

const BinaryModal = ({ user, player, close }) => {
  if (!user || !player) {
    return null;
  }

  return (
    <div className={styles.container}>
      {user.shortlist.length > 0 ? (
        <BinarySort user={user} player={player} close={close} />
      ) : (
        <EmptyShortlist user={user} player={player} close={close} />
      )}
    </div>
  );
};

export default BinaryModal;
