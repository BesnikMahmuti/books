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
import { saveBookContext, updateBookList, snackBarContent } from "../actions";
import { Link } from "react-router-dom";
import { GET_ALL_BOOKS } from "../constants";
import { deleteBookFromDB } from "../bookUtils";
import { deleteBook } from "../actions";
import Button from "@material-ui/core/Button";
import { ButtonWrapperCenter, LoadingScreen } from "../styledComponents/books";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from '@material-ui/lab/Alert';
import { MessageSnackBar } from "./MessageSnackBar"

export const Books = () => {
  const dispatch = useDispatch();
  const { bookId = "", bookDeleted = false } = useSelector(
    (state) => state.bookActions
  );
  const bookContext = useSelector(state => state.bookContext);
  console.log({ bookId, bookDeleted });
  const classes = booksStyle();
  const [books, setBooks] = useState([]);
  const [skip, setSkip] = useState(skip => skip ? skip + 0 : 0);
  const [booksFromApi, setBooksFromApi] = useState(() => []);
  const [loading, setLoading] = useState(() => false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuOpened, openMenu] = useState(() => false);
  const [deletedBookMsg, setDeletedBookMsg] = useState(false);
  const booksListUpdated = useSelector(state => state.bookActions);

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

  const deleteBookFromUI = async (e) => {
    openMenu(false);
    const { _id } = bookContext || {};
    console.log({_id});
    const deletedBook = await deleteBookFromDB(_id);
    console.log({deletedBook});
    if(deletedBook) {
      setDeletedBookMsg(true)
    }
    window.scrollTo(0, 0)
    setBooks(books.filter(book => book._id !== _id));
    setTimeout(() => {
      setDeletedBookMsg(false)
    }, 1000);
  };

  useEffect(() => {
    const booksResponse = async () => {
      setLoading(true);
      const data = await GET(`${GET_ALL_BOOKS}?skip=${skip}&limit=5`);
      setBooksFromApi(data.books);
      setBooks([...books, ...data.books]);
      setLoading(false);
    };
    booksResponse();
  },[skip]);
  
  return (
    <Fragment>
      {
        deletedBookMsg && 
      <Alert severity="success" color="success">
        Book '{bookContext.title}' deleted successfully
      </Alert>
      }
      {loading && (
        <LoadingScreen>
          <CircularProgress size={48} />
        </LoadingScreen>
      )}
      <div className={classes.root}>
        {books &&
          books.length &&
          !loading &&
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
                    <MenuItem onClick={(e) => deleteBookFromUI()}>
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
      <ButtonWrapperCenter>
        {!loading && booksFromApi.length >= 5 && (
          <Button
            variant="contained"
            onClick={() => {
              setSkip(skip + books.length);
              dispatch(updateBookList(!booksListUpdated));
            }}
          >
            Read More
          </Button>
        )}
      </ButtonWrapperCenter>
    </Fragment>
  );
};
