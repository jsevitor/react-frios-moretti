import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  width: 100%;
`;

export const Left_Container = styled.div`
  width: 100%;
  font-size: 20%;
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
  }
`;

export const Welcome = styled.p`
  font-size: 1.1rem;
`;

export const Title = styled.div`
  font-size: 3rem;
  font-weight: 500;

  span {
    font-size: 3rem;
    font-weight: 200;
  }

  @media (min-width: 1024px) {
    font-size: 4rem;

    span {
      font-size: 4rem;
    }
  }
`;

export const Slogan = styled.p`
  font-size: 1rem;
  font-weight: 300;

  span {
    font-size: 1rem;
    font-weight: 500;
  }

  @media (min-width: 1024px) {
    font-size: 1.5rem;

    span {
      font-size: 1.5rem;
    }
  }
`;

export const Right_Container = styled.aside`
  display: none;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 0.5fr 1.5fr;
    align-items: stretch;
    max-width: 100%;
    overflow: hidden;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  height: 100%;
`;

export const ImageSmall = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border: 1px solid #000;
`;

export const ImageBig = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Mantém o enquadramento */
  object-position: center;
  border: 1px solid #000;
`;
