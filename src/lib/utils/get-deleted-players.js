const getDeletedPlayers = (user, players) => {
    if (!user || !players) {
      return [];
    }
    const deletedPlayers = players.filter(
      (player) => user.deletedPlayers.includes(player.id)
    );
    return deletedPlayers;
  };
  
  export default getDeletedPlayers;
  