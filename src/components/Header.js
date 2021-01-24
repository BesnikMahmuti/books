import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { HeaderNavBarContainer } from "../styledComponents/header";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";

export const Header = () => {
  const bookContext = useSelector((state) => state.bookContext);
  const url = window.location.href;
  const bookId = url.split("book/")[1];
  console.log("urllllllllll", url.split("book/")[1], bookContext);
  const bookDetails = `Book ${bookId}`;
  console.log(bookDetails);
  return (
    <HeaderNavBarContainer>
      <AppBar position="static" style={{ backgroundColor: "#000" }}>
        <Toolbar variant="dense">
          <Breadcrumbs aria-label="breadcrumb" style={{ color: "white" }}>
            <Tooltip title="Return to the main page" aria-label="Return to main page">
              <Link className="whiteColor" to="/">
                Books
              </Link>
            </Tooltip>
            {/* <Link color="inherit" to="/getting-started/installation/">
              Book
            </Link> */}
            <Typography color="textPrimary" style={{ color: "white" }}>
              {bookDetails}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="inherit">
            {/* <Link to="/">
            {bookId ? `Book / ${bookId}` : "Books"} */}
          </Typography>
        </Toolbar>
      </AppBar>
    </HeaderNavBarContainer>
  );
};
