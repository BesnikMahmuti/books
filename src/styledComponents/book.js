import styled from "styled-components";

export const BookWrapper = styled.div`
    display:grid;
    padding: 40px;
    grid-template-columns: minmax(250px, 25%) 1fr;
`;

export const CoverContainer = styled.div`
    width:100%;
`;

export const BookDetailsContainer = styled.div`
    width:100%;
    margin-left:20px
`;

export const BookTitle = styled.h1`
    margin:0;
    word-break:break-word
`;

export const Author = styled.h3`
    margin:0;
    word-break:break-word
`;

export const BookMetadatas = styled.div`

`;

export const NumberOfPages = styled.span`

`;