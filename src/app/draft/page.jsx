"use client";
import { useContext } from "react";
import DraftPage from "../components/templates/draft";
import { PlayersContext } from "@/lib/context/players-context";

export default function Draft() {
  const players = useContext(PlayersContext);
  return <DraftPage players={players} />;
}
