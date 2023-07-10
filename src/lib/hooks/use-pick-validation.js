import { useContext } from "react";
import { PlayersContext } from "../context/players-context";

const usePickValidation = () => {
  const players = useContext(PlayersContext);

  const handlePickValidation = (player, user) => {
    const myTeam = players.filter((player) => user.myTeam.includes(player.id));
    if (myTeam.length < 1) {
      return { valid: true, msg: "validPick" };
    }
    if (user.myTeam.length > 15) {
      return { valid: false, msg: "full" };
    }
    if (!maxFromTeam(player, myTeam)) {
      return { valid: false, msg: "max team" };
    }
    if (!maxPosition(player, myTeam)) {
      return { valid: false, msg: "max position" };
    }
    if (!minRequirements(player, myTeam)) {
      return { valid: false, msg: "min req" };
    }
    return { valid: true, msg: "valid pick" };
  };

  const maxFromTeam = (player, myTeam) => {
    let count = 0;
    myTeam.forEach((teamPlayer) => {
      if (teamPlayer && teamPlayer.team.name === player.team.name) {
        count++;
      }
    });
    if (count >= 2) {
      return false;
    }
    return true;
  };

  const maxPosition = (player, myTeam) => {
    let count = 0;
    const position = player.position.name;
    myTeam.forEach((teamPlayer) => {
      if (teamPlayer && teamPlayer.position.name === position) {
        count++;
      }
    });
    if (position === "GK" && count >= 3) {
      return false;
    }
    if (position === "FW" && count >= 6) {
      return false;
    }
    return true;
  };

  const minRequirements = (player, myTeam) => {
    const positionArray = myTeam.map((teamPlayer) => teamPlayer.position.name);
    positionArray.push(player.position.name);
    let needed = 8;
    let picksLeft = 15 - positionArray.length;
    var count = {};
    positionArray.forEach(function (i) {
      count[i] = (count[i] || 0) + 1;
    });
    if (count.DM) {
      count.MID = count.DM;
    }
    if (count.MF) {
      if (count.MID) {
        count.MID = count.MID + count.MF;
      } else {
        count.MID = count.MF;
      }
    }
    if (count.GK) {
      needed = needed - 1;
    }
    if (count.DF) {
      if (count.DF < 3) {
        needed = needed - count.DF;
      } else {
        needed = needed - 3;
      }
    }
    if (count.MID) {
      if (count.MID < 3) {
        needed = needed - count.MID;
      } else {
        needed = needed - 3;
      }
    }
    if (count.FW) {
      needed = needed - 1;
    }
    if (picksLeft < needed) {
      return false;
    }
    return true;
  };

  return handlePickValidation;
};

export default usePickValidation;
