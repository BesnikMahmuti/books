import React, { Fragment, useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
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

export const Books = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    const booksResponse = async () => {
      const data = await GET(`http://localhost:3007/api/v1/books`);
      setBooks(data.books);
    };
    booksResponse();
  }, []);
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
                  <MenuItem onClick={(e, element) => console.log(e, element)}>
                    Delete
                  </MenuItem>
                </Menu>
                <Link to={`/book/${_id}`}>
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
                      <Typography gutterBottom variant="h5" component="h2">
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
                {/* <CardActions size="small" color="primary">
                  Read More
                </CardActions> */}
              </Fragment>
            </Card>
          );
        })}
    </div>
  );
};
