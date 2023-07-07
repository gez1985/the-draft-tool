"use client";

import { DragDropContext } from "react-beautiful-dnd";
import { useUser } from "./user-context";
import usePickValidation from "../hooks/use-pick-validation";
import { useContext } from "react";
import { PlayersContext } from "./players-context";

const DragDropProvider = ({ children }) => {
  const { user, updateUser } = useUser();
  const players = useContext(PlayersContext);

  const handlePickValidation = usePickValidation();

  const handleOnDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const page = Number(
      destination.droppableId.charAt(destination.droppableId.length - 1)
    );

    const pageIndex = page ? page - 1 : null;

    const shortlistDraftPageDrag = (playerId) => {
      const shortlistIds = Array.from(user.shortlist);
      const validShortlistIds = shortlistIds.filter((playerId) => {
        const player = players.find((player) => player.id === playerId);
        const valid = handlePickValidation(player, user);
        if (valid.valid) {
          return true;
        } else {
          return false;
        }
      });
      const playerBelowIndex = user.shortlist.indexOf(
        validShortlistIds[destination.index]
      );
      const removeIndex = user.shortlist.indexOf(playerId);
      const newPlayerIds = Array.from(user.shortlist);
      newPlayerIds.splice(removeIndex, 1);
      newPlayerIds.splice(playerBelowIndex, 0, Number(playerId));
      user.shortlist = newPlayerIds;
      updateUser(user);
    };

    if (source.droppableId.charAt(0) === "s") {
      const split = draggableId.split("/");
      const playerId = Number(split[0]);
      const path = split[1];
      if (path === "draft") {
        shortlistDraftPageDrag(playerId);
      } else {
        const newPlayerIds = Array.from(user.shortlist);
        newPlayerIds.splice(source.index + pageIndex * 50, 1);
        newPlayerIds.splice(
          destination.index + pageIndex * 50,
          0,
          Number(playerId)
        );
        user.shortlist = newPlayerIds;
        updateUser(user);
      }
    }

    if (source.droppableId === "players-list") {
      const newPlayerIds = Array.from(user.shortlist);
      newPlayerIds.splice(
        destination.index + pageIndex * 50,
        0,
        Number(draggableId)
      );
      user.shortlist = newPlayerIds;
      updateUser(user);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>{children}</DragDropContext>
  );
};

export default DragDropProvider;
