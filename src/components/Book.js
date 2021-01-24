import { GET } from "../httpUtils";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookWrapper, CoverContainer, BookDetailsContainer, BookTitle, Author, BookMetadatas, NumberOfPages } from "../styledComponents/book"; 

export const Book = () => {
  let { id } = useParams();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const booksResponse = async () => {
      const data = await GET(`http://localhost:3007/api/v1/book/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setBooks(data);
      return data;
    };
    booksResponse();
  }, []);
  console.log(books);
  return (
    <div>
        <BookWrapper>
          <CoverContainer>
             <img src={books.cover_image} alt="" style={{}}></img>
          </CoverContainer>
          <BookDetailsContainer>
              <BookTitle>{books.title}</BookTitle>
              <Author>By {books.author}</Author>
              <BookMetadatas>
                  <NumberOfPages>Number of pages: {books.number_of_pages}</NumberOfPages>
                  <span>Genre: {books.genre}</span>
              </BookMetadatas>

          </BookDetailsContainer>
        </BookWrapper>
    </div>
  );
};
