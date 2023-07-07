import React from "react";
import { useUser } from "@/lib/context/user-context";
import ButtonSmall from "@/app/components/common/button-small";

const EmptyShortlist = ({user, player, close }) => {
  const { updateUser } = useUser();

  const handleAddPlayer = () => {
    user.shortlist.push(player.id);
    updateUser(user);
    close();
  };

  return (
    <div>
      <p>Your shortlist is empty</p>
      <p>Add {player.name} to your shortlist?</p>
      <ButtonSmall onClick={handleAddPlayer}>Yes</ButtonSmall>
      <ButtonSmall
        onClick={close}
        styleOverride={{ marginLeft: "12px", backgroundColor: "#b90e0a" }}
      >
        No
      </ButtonSmall>
    </div>
  );
};

export default EmptyShortlist;
