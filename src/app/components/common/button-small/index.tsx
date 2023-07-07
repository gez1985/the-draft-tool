import React from "react";
import styles from "./styles.module.css";

type ButtonProps = {
  isLoading?: boolean;
  styleOverride?: object;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonSmall = ({
  children,
  isLoading = false,
  styleOverride,
  ...props
}: ButtonProps) => {

  return (
    <button
      {...props}
      className={styles.container}
      style={styleOverride}
    >
      {children}
      {/* {isLoading ? <Spinner /> : children} */}
    </button>
  );
};

export default ButtonSmall;
