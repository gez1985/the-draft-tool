import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useUser } from "@/lib/context/user-context";
import styles from "./styles.module.css";
import { MdAddBox, MdDelete, MdCompareArrows } from "react-icons/md";
import { IconContext } from "react-icons";
import ButtonClear from "@/app/components/common/button-clear";

const Container = styled.div`
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "#c2edce" : "white")};
`;

const Player = ({ player, index, handleBinaryClick }) => {
  const { discardPlayer, updatingUser } = useUser();

  if (!player) {
    return null;
  }

  return (
    <Draggable
      draggableId={player.id.toString()}
      index={index}
      isDragDisabled={updatingUser}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div className={styles.content}>
            <span className={styles.text}>{player.name}</span>
            <span className={styles.info}>{player.position.name}</span>
            <span className={styles.info}>{player.team.name}</span>
            <span className={styles.points}>{player.points}</span>
            <ButtonClear
              disabled={updatingUser}
              onClick={() => console.log("clicked")}
            >
              <IconContext.Provider
                value={{
                  color: "grey",
                  // color: "#52ab98",
                  size: "2rem",
                  className: styles.icon,
                  style: { cursor: "not-allowed" },
                }}
              >
                <MdAddBox />
              </IconContext.Provider>
            </ButtonClear>
            <ButtonClear
              disabled={updatingUser}
              onClick={() => handleBinaryClick(player)}
            >
              <IconContext.Provider
                value={{
                  color: "#388087",
                  size: "2rem",
                  className: styles.icon,
                }}
              >
                <MdCompareArrows />
              </IconContext.Provider>
            </ButtonClear>
            <ButtonClear
              disabled={updatingUser}
              onClick={() => discardPlayer(player.id)}
            >
              <IconContext.Provider
                value={{
                  color: "#b90e0a",
                  size: "2rem",
                  className: styles.icon,
                }}
                style={{ margin: "0" }}
              >
                <MdDelete />
              </IconContext.Provider>
            </ButtonClear>
          </div>
        </Container>
      )}
    </Draggable>
  );
};

export default Player;
