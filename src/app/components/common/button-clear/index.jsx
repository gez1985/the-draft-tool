import React from "react";
import styles from "./styles.module.css";

const ButtonClear = ({ children, styleOverride, ...props }) => {
  return (
    <button {...props} className={styles.container} style={styleOverride}>
      {children}
    </button>
  );
};

export default ButtonClear;
