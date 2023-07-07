import { useState } from "react";
import styles from "./styles.module.css";
import { Droppable } from "react-beautiful-dnd";
import Player from "./player";
import Pagination from "@/app/components/common/pagination";
import { paginate } from "@/lib/utils/paginate";
import clsx from "clsx";

const PlayersList = ({ players, handleBinaryClick, setSort }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 30;

  const paginatedPlayers = paginate(players, currentPage, pageSize);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.title}>Players</h3>
        <Pagination
          items={players.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
      <div className={styles.headings}>
        <h5
          onClick={() => setSort("")}
          className={styles.heading}
          style={{ justifySelf: "start" }}
        >
          Name
        </h5>
        <h5 onClick={() => setSort("position")} className={styles.heading}>
          Pos.
        </h5>
        <h5 onClick={() => setSort("team")} className={styles.heading}>
          Team
        </h5>
        <h5
          onClick={() => setSort("points")}
          className={clsx(styles.heading, styles.points)}
        >
          Points
        </h5>
        <h5 className={styles.heading} style={{ cursor: "auto" }}>
          Actions
        </h5>
      </div>
      <div className={styles.listWrapper}>
        <Droppable droppableId="players-list" isDropDisabled={true}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {paginatedPlayers.map((player, index) => (
                <Player
                  key={player.id}
                  player={player}
                  index={index}
                  handleBinaryClick={handleBinaryClick}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default PlayersList;
