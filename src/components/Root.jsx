import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";

export default function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
      <CssBaseline />
    </>
  );
}
