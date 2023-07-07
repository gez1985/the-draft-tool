import React from "react";
import styles from "./player-style.module.css";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useUser } from "@/lib/context/user-context";
import { MdIndeterminateCheckBox } from "react-icons/md";
import { IconContext } from "react-icons";
import { usePathname } from "next/navigation";
import ButtonClear from "../button-clear";

const Container = styled.div`
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "#c2edce" : "white")};
`;

const Player = ({ player, index }) => {
  const { removeFromShortlist, updatingUser } = useUser();

  const pathname = usePathname();

  const handleRemoveClick = (index) => {
    if (!updatingUser) {
      removeFromShortlist(index);
    }
  };

  const getIsDragDisabled = () => {
    if (updatingUser) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Draggable
        draggableId={`${player.id.toString()}${pathname}`}
        index={index}
        isDragDisabled={getIsDragDisabled()}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div className={styles.content}>
              <span className={styles.text}>{player.shortlistPosition}</span>
              <div className={styles.nameWrapper}>
                <span className={styles.text}>{player.name}</span>
                <span className={styles.pointsLabel}>({player.points})</span>
              </div>
              <span className={styles.info}>{player.position.name}</span>
              <span className={styles.info}>{player.team.name}</span>
              <div className={styles.iconWrapper}>
                <ButtonClear
                  onClick={() => handleRemoveClick(index)}
                  disabled={updatingUser}
                >
                  <IconContext.Provider
                    value={{
                      color: "#b90e0a",
                      size: "2rem",
                      className: styles.deleteBtn,
                    }}
                  >
                    <MdIndeterminateCheckBox />
                  </IconContext.Provider>
                </ButtonClear>
              </div>
            </div>
          </Container>
        )}
      </Draggable>
    </div>
  );
};

export default Player;
