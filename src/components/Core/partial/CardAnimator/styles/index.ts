// styles/index.ts
import styled from 'styled-components';

export const LayoutGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas: 
    "cards"
    "bottom";
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
  padding: 20px;
  margin: 0 auto;

  @media (max-width: 1840px) {
    margin: 0 20px;
  }
`;

export const CardsContainer = styled.div`
  grid-area: cards;
  margin: 0;
  min-height: 45vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .cards {
    position: relative;
    width: 100%;
    height: 24rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const BottomContainer = styled.div`
  grid-area: bottom;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 20px;
`;

export const CodeContainer = styled.div`
  min-height: 45vh;
`;

export const ConfigContainer = styled.div`
  min-height: 45vh;
`;