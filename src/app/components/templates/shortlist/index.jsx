"use client";

import { useContext, useState } from "react";
import styles from "./styles.module.css";
import PlayersList from "../../shortlist-page/players-list";
import { PlayersContext } from "@/lib/context/players-context";
import { useUser } from "@/lib/context/user-context";
import Modal from "../../common/modal";
import DiscardedModal from "../../shortlist-page/discarded-modal";
import BinaryModal from "../../shortlist-page/binary-modal";
// import Search from "../../shortlist-page/search";
import sortArray from "sort-array";
import getShortlistedPlayers from "@/lib/utils/get-shortlisted-players";
import MyShortlist from "@/app/components/common/shortlist";
import getSortedPlayers from "@/lib/utils/get-sorted-players";
import HeaderButtons from "../../shortlist-page/header-buttons";

const Shortlist = () => {
  const players = useContext(PlayersContext);
  const { user } = useUser();
  const [showDiscarded, setShowDiscarded] = useState(false);
  const [showBinary, setShowBinary] = useState(false);
  const [binaryPlayer, setBinaryPlayer] = useState();
  const [searchName, setSearchName] = useState("");
  const [sort, setSort] = useState("");

  const getAvailablePlayers = () => {
    const namedPlayers = players.filter((player) =>
      player.name.toLowerCase().includes(searchName.toLowerCase())
    );
    const availablePlayers = namedPlayers.filter((player) => {
      return (
        !user.shortlist.includes(player.id) &&
        !user.discardedPlayers.includes(player.id)
      );
    });
    getSortedPlayers(availablePlayers, sort);
    return availablePlayers;
  };

  const getDiscardedPlayers = () => {
    const discardedPlayers = players.filter((player) =>
      user.discardedPlayers.includes(player.id)
    );
    sortArray(discardedPlayers, {
      by: "name",
    });
    return discardedPlayers;
  };

  const handleBinaryClick = (player) => {
    setBinaryPlayer(player);
    setShowBinary(true);
  };

  if (!players || !user) {
    return <div>loading...</div>;
  }

  const availablePlayers = getAvailablePlayers();
  const shortlistedPlayers = getShortlistedPlayers(user, players, searchName);
  const discardedPlayers = getDiscardedPlayers();

  const getDiscardedModal = () => {
    return (
      <Modal
        isOpen={showDiscarded}
        onClose={() => setShowDiscarded(false)}
        title="discarded players:"
      >
        <DiscardedModal players={discardedPlayers} />
      </Modal>
    );
  };

  const getBinaryModal = () => {
    return (
      <Modal
        isOpen={showBinary}
        onClose={() => setShowBinary(false)}
        title={`Sort ${binaryPlayer ? binaryPlayer.name : ""}`}
      >
        <BinaryModal
          user={user}
          player={binaryPlayer}
          close={() => setShowBinary(false)}
        />
      </Modal>
    );
  };

  return (
    <>
      {getDiscardedModal()}
      {getBinaryModal()}
      {/* <Search name={searchName} setName={setSearchName} /> */}
      <div className={styles.container}>
        <div className={styles.buttonWrapper}>
          <HeaderButtons setShowDiscarded={setShowDiscarded} />
        </div>
        <div className={styles.itemA}>
          <PlayersList
            players={availablePlayers}
            handleBinaryClick={handleBinaryClick}
            sort={sort}
            setSort={setSort}
          />
        </div>

        <div className={styles.itemB}>
          <MyShortlist players={shortlistedPlayers} />
        </div>
      </div>
    </>
  );
};

export default Shortlist;
