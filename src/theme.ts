"use client";
import { createTheme } from "@mui/material/styles";
import { ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#ffb752",
    },
  },
};

const theme = createTheme({});

export default theme;
