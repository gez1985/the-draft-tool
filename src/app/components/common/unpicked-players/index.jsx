import { useState } from "react";
import styles from "./styles.module.css";
import Player from "./player";
import getSortedPlayers from "@/lib/utils/get-sorted-players";

const UnpickedPlayers = ({
  players,
  handlePick,
  setDeletePlayer,
  name,
  setName,
}) => {
  const [sort, setSort] = useState("");

  const namedPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(name.toLowerCase())
  );

  getSortedPlayers(namedPlayers, sort);

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.title}>Unpicked Players</h3>
        <input
          type="text"
          className={styles.search}
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Search by name:"
        ></input>
      </div>
      <div className={styles.headings}>
        <h5
          onClick={() => setSort("")}
          className={styles.heading}
          style={{ justifySelf: "start" }}
        >
          Name
        </h5>
        <div className={styles.infoHeadingsWrapper}>
          <h5 onClick={() => setSort("position")} className={styles.heading}>
            Pos.
          </h5>
          <h5 onClick={() => setSort("team")} className={styles.heading}>
            Team
          </h5>
        </div>

        <h5 className={styles.heading} style={{ cursor: "auto" }}>
          Actions
        </h5>
      </div>
      <div className={styles.listWrapper}>
        {namedPlayers.map((player, index) => (
          <Player
            key={player.id}
            player={player}
            index={index}
            handlePick={handlePick}
            setDeletePlayer={setDeletePlayer}
          />
        ))}
      </div>
    </div>
  );
};

export default UnpickedPlayers;
