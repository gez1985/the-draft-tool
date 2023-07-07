"use client";

import { createContext } from "react";

export const PlayersContext = createContext(undefined);

const PlayersProvider = ({ children, players }) => {
  return (
    <PlayersContext.Provider value={players}>
      {children}
    </PlayersContext.Provider>
  );
};

export default PlayersProvider;
