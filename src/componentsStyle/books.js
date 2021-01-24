import { makeStyles } from "@material-ui/core/styles";

export const booksStyle = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridGap: "1rem",
    padding: "1rem",
    gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
  },
  cardActionArea: {
    height: "93%",
  },
  image: {
    objectFit: "cover",
    objectPosition: "top",
  },
}));
