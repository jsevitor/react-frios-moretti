import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 0.7fr 1.3fr;
  }
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
  display: block;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 0.5fr 1.5fr;
    align-items: stretch;
    max-height: 60%;
    overflow: hidden;
    border-bottom: 1px solid #000;
  }

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 0.5fr 1.5fr;
    align-items: stretch;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    border-bottom: 1px solid #000;
  }
`;

export const Grid = styled.div`
  display: block;

  @media (min-width: 768px) {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    height: 100%;
  }

  @media (min-width: 1024px) {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    height: 100%;
  }
`;

export const ImageSmall = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border: 1px solid #000;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }

  @media (min-width: 1024px) {
    display: block;
  }
`;

export const ImageBig = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border: 1px solid #000;
  margin-top: 1rem;

  @media (min-width: 1024px) {
    margin-top: 0;
  }
`;
