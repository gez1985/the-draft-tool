import sortArray from "sort-array";

const getSortedPlayers = (players, sortBy) => {
  if (sortBy === "") {
    sortArray(players, {
      by: "name",
    });
  } else if (sortBy === "position") {
    sortArray(players, {
      by: ["positionSort", "name"],
    });
  } else if (sortBy === "points") {
    sortArray(players, {
      by: ["points", "name"],
      order: "desc",
    });
  } else {
    sortArray(players, {
      by: ["string", "positionSort", "name"],
      computed: {
        string: (row) => row.team.name,
      },
    });
  }
};

export default getSortedPlayers;
