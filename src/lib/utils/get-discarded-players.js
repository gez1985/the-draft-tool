import sortArray from "sort-array";

const getDiscardedPlayers = (user, players) => {
  if (!user || !players) {
    return [];
  }
  const discardedPlayers = players.filter((player) =>
    user.discardedPlayers.includes(player.id)
  );
  sortArray(discardedPlayers, {
    by: "name",
  });
  return discardedPlayers;
};

export default getDiscardedPlayers;
