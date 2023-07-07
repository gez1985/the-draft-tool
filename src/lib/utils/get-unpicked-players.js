const getUnpickedPlayers = (user, players) => {
  if (!user || !players) {
    return [];
  }
  const unpickedPlayers = players.filter(
    (player) => !user.deletedPlayers.includes(player.id)
  );
  const notInMyTeam = unpickedPlayers.filter(
    (player) => !user.myTeam.includes(player.id)
  );
  const notDiscarded = notInMyTeam.filter((player) =>
    !user.discardedPlayers.includes(player.id)
  );
  return notDiscarded;
};

export default getUnpickedPlayers;
