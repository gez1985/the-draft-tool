import React from "react";
import styles from "./styles.module.css";
import SyncLoader from "react-spinners/SyncLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const PageLoading = () => {
  return (
    <div className={styles.container}>
      <SyncLoader
        color={"#2b6777"}
        // loading={loading}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default PageLoading;
