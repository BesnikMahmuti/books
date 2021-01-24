import styled from "styled-components";

export const BooksWrapper = styled.div`
display:"grid";
grid-gap:"1rem";
padding: "1rem";
grid-template-columns:"repeat(auto-fit, minimax(300px,1fr));
`;

export const CardActionArea = styled.div`
height:"93%";
`;

export const Image = styled.div`
objectFit:"cover";
objectPosition:"top";
`
