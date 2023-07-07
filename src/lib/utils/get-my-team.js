const getMyTeam = (user, players) => {
  if (!user || !players) {
    return [];
  }
  const myTeam = players.filter((player) => user.myTeam.includes(player.id));
  return myTeam;
};

export default getMyTeam;
