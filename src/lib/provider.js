import React from "react";
import { UserProvider } from "./context/user-context";
import PlayersProvider from "./context/players-context";
import DragDropProvider from "./context/drag-drop-context";
import LoadingProvider from "@/app/components/loading";

const getData = async () => {
  const res = await fetch("http://localhost:4000/api/players", {
    next: { revalidate: 21600 },
  });
  return res.json();
};

const getPositionSort = (player) => {
  switch (player.position.name) {
    case "GK":
      return 1;
    case "DF":
      return 2;
    case "DM":
      return 3;
    case "MF":
      return 4;
    default:
      return 5;
  }
};

const Provider = async ({ children }) => {
  const data = await getData();

  if (data) {
    data.players.forEach(
      (player) => (player.positionSort = getPositionSort(player))
    );
  }

  return (
    <UserProvider>
      <PlayersProvider players={data.players}>
        <DragDropProvider>
          <LoadingProvider>{children}</LoadingProvider>
        </DragDropProvider>
      </PlayersProvider>
    </UserProvider>
  );
};

export default Provider;
