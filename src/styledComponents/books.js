import styled from "styled-components";

export const BooksWrapper = styled.div`
display:"grid";
grid-gap:"1rem";
padding: "1rem";
grid-template-columns:"repeat(auto-fit, minimax(300px,1fr));
`;

export const CardActionArea = styled.div`
  height: "93%";
`;

export const Image = styled.div`
  objectfit: "cover";
  objectposition: "top";
`;

export const ButtonWrapperCenter = styled.div`
  display: grid;
  place-items: center;
`;

export const LoadingScreen = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 90vh;
`;
