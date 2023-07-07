import styles from "./styles.module.css";
import { useState } from "react";
import HeaderButtons from "@/app/components/draft-page/header-buttons";
import Shortlist from "@/app/components/common/shortlist";
import UnpickedPlayers from "@/app/components/common/unpicked-players";
import { useUser } from "@/lib/context/user-context";
import getShortlistedPlayers from "@/lib/utils/get-shortlisted-players";
import getUnpickedPlayers from "@/lib/utils/get-unpicked-players";
import getDeletedPlayers from "@/lib/utils/get-deleted-players";
import getDiscardedPlayers from "@/lib/utils/get-discarded-players";
import getMyTeam from "@/lib/utils/get-my-team";
import Modal from "../../common/modal";
import DeletedModal from "@/app/components/common/deleted-players";
import DiscardedModal from "@/app/components/shortlist-page/discarded-modal";
import MyTeamModal from "@/app/components/common/my-team";
import ConfirmPick from "@/app/components/draft-page/confirm-pick";
import DeletePick from "@/app/components/draft-page/delete-pick";
import usePickValidation from "@/lib/hooks/use-pick-validation";
import ValidationError from "@/app/components/draft-page/validation-error";

const DraftPage = ({ players }) => {
  const [name, setName] = useState("");
  const [showMyTeam, setShowMyTeam] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [showDiscarded, setShowDiscarded] = useState(false);
  const [pickedPlayer, setPickedPlayer] = useState();
  const [deletedPlayer, setDeletedPlayer] = useState();
  const [validationError, setValidationError] = useState();

  const { user, deletePlayer, pickPlayer, updatingUser } = useUser();
  const handlePickValidation = usePickValidation();

  const shortlistedPlayers = getShortlistedPlayers(user, players);
  const unPickedPlayers = getUnpickedPlayers(user, players);
  const deletedPlayers = getDeletedPlayers(user, players);
  const discardedPlayers = getDiscardedPlayers(user, players);
  const myTeam = getMyTeam(user, players);

  const notInMyTeam = shortlistedPlayers.filter(
    (player) => !user.myTeam.includes(player.id)
  );

  const availablePlayers = notInMyTeam.filter(
    (player) => !user.deletedPlayers.includes(player.id)
  );

  const validPlayers = availablePlayers.filter((player) => {
    const validPick = handlePickValidation(player, user);
    if (validPick.valid) {
      return true;
    }
    return false;
  });

  const handlePickClick = (player) => {
    const validPick = handlePickValidation(player, user);
    setPickedPlayer(player);
    if (!validPick.valid) {
      setValidationError(validPick.msg);
      setPickedPlayer();
    }
  };

  const handlePickPlayer = (player) => {
    if (!updatingUser) {
      setName("");
      pickPlayer(player.id);
      setPickedPlayer();
    }
  };

  const handleDeletePlayer = (player) => {
    if (!updatingUser) {
      deletePlayer(player.id);
      setName("");
      setDeletedPlayer();
    }
  };

  const getMyTeamModal = () => {
    return (
      <Modal
        isOpen={showMyTeam}
        onClose={() => setShowMyTeam(false)}
        title="my team:"
      >
        <MyTeamModal players={myTeam} />
      </Modal>
    );
  };

  const getDeletedModal = () => {
    return (
      <Modal
        isOpen={showDeleted}
        onClose={() => setShowDeleted(false)}
        title="picked players:"
      >
        <DeletedModal players={deletedPlayers} />
      </Modal>
    );
  };

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

  const getConfirmDelete = () => {
    return (
      <Modal
        isOpen={deletedPlayer}
        onClose={() => setDeletedPlayer()}
        title={deletedPlayer ? `delete ${deletedPlayer.name}` : ""}
      >
        <DeletePick
          player={deletedPlayer}
          handleCancel={() => setDeletedPlayer()}
          handleDelete={handleDeletePlayer}
        />
      </Modal>
    );
  };

  const getConfirmPick = () => {
    return (
      <Modal
        isOpen={pickedPlayer && !validationError}
        onClose={() => setPickedPlayer()}
        title={pickedPlayer ? `pick ${pickedPlayer.name}` : ""}
      >
        <ConfirmPick
          player={pickedPlayer}
          handleCancel={() => setPickedPlayer()}
          handlePick={handlePickPlayer}
        />
      </Modal>
    );
  };

  const getValidationModal = () => {
    return (
      <Modal
        isOpen={validationError}
        onClose={() => setValidationError()}
        title="Invalid Pick"
      >
        <ValidationError msg={validationError} />
      </Modal>
    );
  };

  return (
    <>
      {getDeletedModal()}
      {getDiscardedModal()}
      {getMyTeamModal()}
      {getConfirmDelete()}
      {getConfirmPick()}
      {getValidationModal()}
      <div className={styles.topContainer}>
        <div className={styles.container}>
          <h2 className={styles.headerWrapper}>
            <HeaderButtons
              setShowDeleted={setShowDeleted}
              setShowDiscarded={setShowDiscarded}
              setShowMyTeam={setShowMyTeam}
            />
          </h2>
          <div className={styles.shortlist}>
            <UnpickedPlayers
              players={unPickedPlayers}
              handlePick={handlePickClick}
              setDeletedPlayer={setDeletedPlayer}
              name={name}
              setName={setName}
            />
          </div>
          <div className={styles.players}>
            <Shortlist players={validPlayers} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DraftPage;
