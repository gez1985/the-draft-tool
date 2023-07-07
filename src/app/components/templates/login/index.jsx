import React from "react";
import styles from "./styles.module.css";
import { useUser } from "@/lib/context/user-context";
import Button from "../../common/button";

const PageLogin = () => {
  const { signInUser } = useUser();
  return (
    <div className={styles.container}>
      <Button onClick={signInUser}>sign in / register</Button>
    </div>
  );
};

export default PageLogin;
