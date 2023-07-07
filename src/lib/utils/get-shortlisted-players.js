const getShortlistedPlayers = (user, players, searchName = "") => {
  if (!user || !players) {
    return [];
  }
  const namedPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchName.toLowerCase())
  );
  const shortlistedPlayers = [];
  user.shortlist.forEach((playerId, index) => {
    const player = namedPlayers.find((player) => player.id === playerId);
    if (player) {
      player.shortlistPosition = index + 1;
      shortlistedPlayers.push(player);
    }
  });
  return shortlistedPlayers;
};

export default getShortlistedPlayers;
