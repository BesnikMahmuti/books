import styled from "styled-components";

export const BookWrapper = styled.div`
  display: grid;
  padding: 40px;
  grid-template-columns: minmax(250px, 18%) 1fr;
`;

export const CoverContainer = styled.div`
  width: 100%;
`;

export const BookDetailsContainer = styled.div`
  width: 100%;
  margin-left: 20px;
`;

export const BookTitle = styled.h1`
  margin: 0;
  word-break: break-word;
  font-family: "Merriweather", serif;
  font-weight: 700;
  font-size: 25px;
`;

export const Author = styled.h3`
  font-family: "Merriweather", serif;
  margin: 0;
  //   color: #999999;
  word-break: break-word;
  margin-top: 10px;
  font-weight: 400;
`;

export const BookMetadatas = styled.div`
 font-size:12px;
  margin-top: 4px;
  font-family: "Merriweather", serif;
  font-weight: 300;
`;

export const NumberOfPages = styled.span``;

export const DetailSpan = styled.span`
  margin-left: 10px;
`;

export const BookDetailsWrapper = styled.div`
  margin-left: 20px;
`;

export const BookDescription = styled.h4`
  font-family: "Merriweather", serif;
  margin: 0;
  margin-top: 20px;
  line-height: 30px;
  margin-top:20px;
  word-break: break-word;
  margin-top: 10px;
  font-weight: 400;
  width:70%;
`;
