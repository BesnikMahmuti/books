import React, { Fragment, useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { booksStyle } from "../componentsStyle/books";
import { GET } from "../httpUtils/";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { saveBookContext } from "../actions";
import { Link } from "react-router-dom";
import { GET_ALL_BOOKS } from "../constants";
import { deleteBookFromDB } from "../bookUtils";
import { deleteBook } from "../actions";

export const Books = () => {
  const dispatch = useDispatch();
  const { bookId = "", bookDeleted = false} = useSelector(state => state.bookActions);
  console.log({bookId, bookDeleted});
  const classes = booksStyle();
  const [books, setBooks] = useState(() => []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuOpened, openMenu] = useState(() => false);

  const handleMenuClose = (e) => {
    openMenu(false);
    setAnchorEl(e.currentTarget);
  };

  const openMenuHandler = (e, book) => {
    console.log(book);
    dispatch(saveBookContext(book));
    openMenu(true);
    setAnchorEl(e.currentTarget);
  };

  const deleteBookFromUI = async (id) => {
    const deletedBook = await deleteBookFromDB(id);
    console.log(deletedBook);
    setBooks([])
    setAnchorEl(false)
    openMenu(false)
    dispatch(deleteBook(id, true));
  };

  useEffect(() => {
    const booksResponse = async () => {
      const data = await GET(`${GET_ALL_BOOKS}`);
      setBooks(data.books);
    };
    booksResponse();
  }, [bookDeleted]);
  return (
    <div className={classes.root}>
      {books &&
        books.length &&
        books.map((book) => {
          const { _id, title, author, cover_image } = book;
          return (
            <Card key={_id}>
              <Fragment key={_id}>
                <CardHeader
                  action={
                    <IconButton onClick={(e) => openMenuHandler(e, book)}>
                      <MoreVert />
                    </IconButton>
                  }
                />
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={menuOpened}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={(e, element) => console.log(e, element)}>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={(e, element) => deleteBookFromUI(_id)}>
                    Delete
                  </MenuItem>
                </Menu>
                <Link
                  to={`/book/${_id}`}
                  className="MuiPaper-root MuiCard-root MuiPaper-elevation1 MuiPaper-rounded"
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      // alt=""
                      height="350"
                      className={classes.image}
                      src={cover_image}
                      // title
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.font}
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {author}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Fragment>
            </Card>
          );
        })}
    </div>
  );
};
