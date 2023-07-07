"use client";

import styles from "./styles.module.css";
import clsx from "clsx";
import Link from "next/link";
import useScrollDirection from "@/lib/hooks/use-scroll-direction";
import { useUser } from "@/lib/context/user-context";
import ButtonSmall from "../common/button-small";
import ButtonSmallDark from "../common/button-small-dark";
import BounceLoader from "react-spinners/BounceLoader";
import { usePathname } from "next/navigation";

const Header = () => {
  const scrollDirection = useScrollDirection();
  const { user, signOutUser, updatingUser } = useUser();
  const pathname = usePathname();

  const override = {
    margin: "0",
  };

  return (
    <div
      className={clsx(
        styles.container,
        // scrollDirection === "down" ? styles.hide : null
      )}
    >
      <div className={styles.col1}>
        <div className={styles.titleWrapper}>
          <Link href="/">
            <h1 className={styles.heading}>TDT</h1>
          </Link>
          {updatingUser && (
            <BounceLoader
              color={"#52ab98"}
              loading={true}
              cssOverride={override}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </div>
      </div>
      <div className={styles.col2}>
        {user ? (
          pathname === "/" ? (
            <Link href="/draft">
              <ButtonSmallDark>Go Live</ButtonSmallDark>
            </Link>
          ) : (
            <Link href="/">
              <ButtonSmallDark>Go Back</ButtonSmallDark>
            </Link>
          )
        ) : null}
      </div>
      <div className={styles.col3}>
        {user && (
          <div>
            <div className={styles.name}>Hi {user.name}</div>
            <ButtonSmall onClick={signOutUser}>Log Out</ButtonSmall>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
