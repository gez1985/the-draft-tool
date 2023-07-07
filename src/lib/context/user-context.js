"use client";

import { createContext, useEffect, useState, useContext } from "react";
import useSWR from "swr";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(undefined);
  const [updatingUser, setUpdatingUser] = useState(false);

  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error, mutate } = useSWR("/api/user", fetcher);

  useEffect(() => {
    if (data?.success) {
      setUser(data.user);
      setLoading(false);
    }
    if (data?.success === false) {
      setUser(undefined);
      setLoading(false);
    }
  }, [data]);

  const signInUser = async () => {
    await signIn();
  };

  const signOutUser = async () => {
    try {
      setLoading(true);
      signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      setUser((prevUser) => ({
        ...prevUser,
        updatedUser,
      }));
      await axios.put("/api/user", { updatedUser });
      mutate({ ...data, user: updatedUser });
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete("/api/user");
      setLoading(true);
      await signOut();
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const removeFromShortlist = async (index) => {
    setUpdatingUser(true);
    try {
      user.shortlist.splice(index, 1);
      await updateUser(user);
      setUpdatingUser(false);
    } catch (error) {
      console.log(error.message);
      setUpdatingUser(false);
    }
  };

  const removeFromMyTeam = async (playerId) => {
    setUpdatingUser(true);
    const listCopy = Array.from(user.myTeam);
    const index = listCopy.findIndex((id) => id === playerId);
    if (index > -1) {
      listCopy.splice(index, 1);
    }
    try {
      user.myTeam = listCopy;
      await updateUser(user);
      setUpdatingUser(false);
    } catch (error) {
      console.log(error.message);
      setUpdatingUser(false);
    }
  };

  const discardPlayer = async (playerId) => {
    setUpdatingUser(true);
    try {
      user.discardedPlayers.push(playerId);
      await updateUser(user);
      setUpdatingUser(false);
    } catch (error) {
      console.log(error.message);
      setUpdatingUser(false);
    }
  };

  const deletePlayer = async (playerId) => {
    setUpdatingUser(true);
    try {
      user.deletedPlayers.push(playerId);
      await updateUser(user);
      setUpdatingUser(false);
    } catch (error) {
      console.log(error.message);
      setUpdatingUser(false);
    }
  };

  const pickPlayer = async (playerId) => {
    setUpdatingUser(true);
    try {
      user.myTeam.push(playerId);
      await updateUser(user);
      setUpdatingUser(false);
    } catch (error) {
      console.log(error.message);
      setUpdatingUser(false);
    }
  };

  const restoreDiscardedPlayer = async (playerId) => {
    setUpdatingUser(true);
    const listCopy = Array.from(user.discardedPlayers);
    const index = listCopy.findIndex((id) => id === playerId);
    if (index > -1) {
      listCopy.splice(index, 1);
    }
    try {
      user.discardedPlayers = listCopy;
      await updateUser(user);
      setUpdatingUser(false);
    } catch (error) {
      console.log(error.message);
      setUpdatingUser(false);
    }
  };

  const restoreDeletedPlayer = async (playerId) => {
    setUpdatingUser(true);
    const listCopy = Array.from(user.deletedPlayers);
    const index = listCopy.findIndex((id) => id === playerId);
    if (index > -1) {
      listCopy.splice(index, 1);
    }
    try {
      user.deletedPlayers = listCopy;
      await updateUser(user);
      setUpdatingUser(false);
    } catch (error) {
      console.log(error.message);
      setUpdatingUser(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        user,
        isError: error,
        updateUser,
        deleteUser,
        updatingUser,
        signInUser,
        signOutUser,
        removeFromShortlist,
        discardPlayer,
        deletePlayer,
        pickPlayer,
        restoreDiscardedPlayer,
        restoreDeletedPlayer,
        removeFromMyTeam,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
