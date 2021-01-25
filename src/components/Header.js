import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { HeaderNavBarContainer } from "../styledComponents/header";

export const Header = () => {
  return (
    <HeaderNavBarContainer>
      <AppBar position="static" style={{ backgroundColor: "#000" }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Books
          </Typography>
        </Toolbar>
      </AppBar>
    </HeaderNavBarContainer>
  );
};
