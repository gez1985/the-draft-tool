import { useEffect } from "react";
import styles from "./styles.module.css";
import Button from "../button";
import clsx from "clsx";

const Modal = ({ isOpen, onClose, children, title }) => {
  return (
    <div className={clsx(styles.overlay, isOpen ? styles.show : "")}>
      <div className={clsx(styles.content, isOpen ? styles.show : "")}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.childrenWrapper}>{children}</div>
        <div>
          <Button className={styles.closeBtn} onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
