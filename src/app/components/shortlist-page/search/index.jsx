import { useState, useRef } from "react";
import styles from "./styles.module.css";
import { IconContext } from "react-icons";
import { MdKeyboardArrowDown } from "react-icons/md";
import clsx from "clsx";

const Search = ({ name, setName }) => {
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);

  const handleClick = () => {
    if (show) {
      setShow(false);
      setName("");
      inputRef.current.blur();
    } else {
      setShow(true);
      inputRef.current.focus();
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.wrapper}
        style={{
          width: !show ? "140px" : "207px",
          height: !show ? "35px" : "67px",
        }}
      >
        <div className={styles.always} onClick={handleClick}>
          <span className={styles.text}>Search by name</span>
          <div
            className={clsx(styles.iconWrapper, show ? styles.rotate : null)}
          >
            <IconContext.Provider
              value={{
                color: "#888",
                size: "2rem",
                className: styles.deleteBtn,
              }}
            >
              <MdKeyboardArrowDown />
            </IconContext.Provider>
          </div>
        </div>
        <div>
          <input
            type="text"
            className={clsx(styles.search, show ? styles.showSearch : null)}
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Shaun Goater"
            ref={inputRef}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Search;
