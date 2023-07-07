import { useState } from "react";
import styles from "./styles.module.css";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Player from "./player";
import { paginate } from "@/lib/utils/paginate";
import Pagination from "@/app/components/common/pagination";
import { usePathname } from "next/navigation";

const PlayerList = styled.div`
  padding: 8px;
  background-color: ${(props) =>
    props.isDraggingOver ? "#badfe7" : "#f2f2f2"};
  min-height: 100%;
  border-radius: 0 0 2px 2px;
`;

const Shortlist = ({ players }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pathname = usePathname();

  const pageSize = 50;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedPlayers = paginate(players, currentPage, pageSize);

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.title}>Shortlist</h3>
        <Pagination
          items={players.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
      <div className={styles.listWrapper}>
        <Droppable
          droppableId={`shortlist-${currentPage}`}
          // isDropDisabled={pathname === "/draft" ? true : false}
        >
          {(provided, snapshot) => (
            <PlayerList
              className={styles.list}
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {paginatedPlayers.map((player, index) => (
                <Player key={player.id} player={player} index={index} />
              ))}
              {provided.placeholder}
            </PlayerList>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Shortlist;
