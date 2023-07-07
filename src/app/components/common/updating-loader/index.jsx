import React from "react";
import styles from "./styles.module.css";
import BounceLoader from "react-spinners/BounceLoader";

const UpdatingLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <BounceLoader
          color={"#52ab98"}
          loading={true}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default UpdatingLoader;
