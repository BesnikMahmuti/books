import { GET } from "../httpUtils";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_BOOK } from "../constants";
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
  BookDescription
} from "../styledComponents/book";

export const Book = () => {
  let { id } = useParams();
  const [book, setBooks] = useState([]);
  useEffect(() => {
    const booksResponse = async () => {
      const data = await GET(`${GET_BOOK}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setBooks(data);
      return data;
    };
    booksResponse();
  }, [id]);
  console.log(book);
  return (
    <div>
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
                <b>Number of pages: </b>{book.number_of_pages}
              </NumberOfPages>
              <DetailSpan><b>Genre: </b>{book.genre}</DetailSpan>
              <DetailSpan><b>Publications: </b>{book.publications && book.publications.length && book.publications.toString()}</DetailSpan>
              <DetailSpan><b>ISBN: </b>{book.ISBN}</DetailSpan>
            </BookMetadatas>
            <BookDescription>{book.description}</BookDescription>
          </BookDetailsWrapper>
        </BookDetailsContainer>
      </BookWrapper>
    </div>
  );
};
