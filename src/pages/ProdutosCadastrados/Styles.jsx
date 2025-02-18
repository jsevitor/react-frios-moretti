import styled from "styled-components";
import { colors } from "../../styles/Variables";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  overflow-x: auto;
  overflow-y: auto;

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;

  @media (min-width: 1024px) {
    justify-content: space-between;

    .filters {
      display: flex;
      gap: 1rem;

      input {
        width: 350px;
        padding: 0.2rem 0.8rem;
        background-color: ${colors.veryLightGray};
        border: 1px solid ${colors.green};
        border-radius: 50px;
        outline: none;
      }
    }
  }
`;

export const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  padding: 0 0.5rem;

  .filter_actions {
    display: flex;
    gap: 1rem;

    i {
      padding: 0 0.2rem;
      font-size: 18px;
      opacity: 1;
    }

    &:hover i {
      cursor: pointer;
    }
  }

  .filter_search {
    width: 500px;
    display: flex;
    gap: 0.5rem;
    padding: 0.2rem 0.8rem;
    background-color: ${colors.veryLightGray};
    border: 1px solid ${colors.green};
    border-radius: 50px;
    outline: none;

    input {
      width: 100%;
      border: none;
      outline: none;
      background: none;
    }
  }
`;

export const Table = styled.table`
  background-color: ${colors.lightGray};
  width: 100%;
  height: fit-content;
  border-collapse: collapse;

  .checkbox {
    width: 20px;
  }

  .middle {
    text-align: center;
  }
`;

export const Thead = styled.thead`
  background-color: ${colors.green};

  th {
    padding: 0.5rem;
    color: ${colors.white};
    text-align: left;
    border-bottom: 1px solid ${colors.veryLightGray};
  }
`;

export const Tbody = styled.tbody`
  td {
    padding: 0.1rem 0.5rem;
    width: auto;
    height: fit-content;
    border: 1px solid ${colors.veryLightGray};
  }

  img {
    width: 20px;
    height: 20px;
    border-radius: 100%;
  }

  tr.selected {
    background-color: ${colors.selected};
    color: ${colors.white};
  }
`;

export const LoaderContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 50vh;
`;

export const LoaderCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
