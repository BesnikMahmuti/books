import { GET } from "../httpUtils";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_BOOK } from "../constants";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Tooltip from "@material-ui/core/Tooltip";
import { LoadingScreen } from "../styledComponents/books";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  BookWrapper,
  CoverContainer,
  BookDetailsContainer,
  BookTitle,
  Author,
  BookMetadatas,
  NumberOfPages,
  DetailSpan,
  BookDetailsWrapper,
  BookDescription,
  BookDetails,
} from "../styledComponents/book";
import { Link } from "react-router-dom";

export const Book = () => {
  let { id } = useParams();
  const [book, setBooks] = useState([]);
  const [loading, setLoading] = useState(() => false);
  useEffect(() => {
    const booksResponse = async () => {
      setLoading(true);
      const data = await GET(`${GET_BOOK}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setBooks(data);
      setLoading(false);
      return data;
    };
    booksResponse();
  }, [id]);
  console.log(book);
  return (
    <div>
      {loading && (
        <LoadingScreen>
          <CircularProgress size={48} />
        </LoadingScreen>
      )}
      {!loading && (
        <Fragment>
          <BookDetails>
            <Tooltip title="Return to home page">
              <Link to="/">
                <ArrowBackIcon
                  color="primary"
                  style={{ paddingRight: "10px" }}
                />
              </Link>
            </Tooltip>
            Book Details
          </BookDetails>
          <BookWrapper>
            <CoverContainer>
              <img src={book.cover_image} alt="" style={{}}></img>
            </CoverContainer>
            <BookDetailsContainer>
              <BookDetailsWrapper>
                <BookTitle>{book.title}</BookTitle>
                <Author>By {book.author}</Author>
                <BookMetadatas>
                  <NumberOfPages>
                    <b>Number of pages: </b>
                    {book.number_of_pages}
                  </NumberOfPages>
                  <DetailSpan>
                    <b>Genre: </b>
                    {book.genre}
                  </DetailSpan>
                  <DetailSpan>
                    <b>Publications: </b>
                    {book.publications &&
                      book.publications.length &&
                      book.publications.toString()}
                  </DetailSpan>
                  <DetailSpan>
                    <b>ISBN: </b>
                    {book.ISBN}
                  </DetailSpan>
                </BookMetadatas>
                <BookDescription>{book.description}</BookDescription>
              </BookDetailsWrapper>
            </BookDetailsContainer>
          </BookWrapper>
        </Fragment>
      )}
    </div>
  );
};
