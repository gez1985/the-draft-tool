"use client";

import React from "react";
import styles from "./styles.module.css";
import { useUser } from "@/lib/context/user-context";
import PageLoading from "../templates/page-loading";
import Header from "../header/header";
import PageLogin from "../templates/login";

const LoadingProvider = ({ children }) => {
  const { user, isError, loading } = useUser();

  if (isError) {
    return (
      <>
        <Header />
        <div>There has been an error, please try again</div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Header />
        <PageLoading />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header />
        <PageLogin />
      </>
    );
  }

  return <div>{children}</div>;
};

export default LoadingProvider;
