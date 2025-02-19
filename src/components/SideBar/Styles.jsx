import styled from "styled-components";
import { colors, measures } from "../../styles/Variables";

export const Container = styled.div`
  width: 95%;
  padding: 1rem;
  display: ${(props) => (props.sidebar ? "flex" : "none")};
  flex-direction: column;
  gap: 1rem;
  background-color: ${colors.lightGray};
  border-radius: 1rem;
  position: absolute;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  animation: showSidebar 0.4s;
  border-right: 1px solid rgba(184, 184, 184, 1);
  z-index: 999;

  hr {
    display: none;
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 80px;
    left: 0;
    transform: translateX(0);
    border-radius: 0;
    height: ${measures.heightSize};
    max-width: 300px;

    hr {
      display: block;
    }

    &.collapsed {
      max-width: 80px;
      padding: 0.5rem;
    }
  }
`;

export const HideMenu = styled.div`
  display: none;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 1024px) {
    display: block;
    display: flex;
    justify-content: end;
    padding-top: 0.5rem;

    &.collapsed {
      justify-content: center;
    }
  }
`;

export const NavContainer = styled.nav`
  flex: 1;
`;

export const MenuItems = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 1024px) {
    &.collapsed {
      align-items: center;
      text-align: center;
    }
  }
`;

export const MenuItem = styled.li`
  a {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;

    &:hover {
      background-color: ${colors.veryLightGray};
      padding: 0.5rem;
      border-radius: 0.5rem;
    }
  }
`;

export const Icon = styled.i`
  font-size: 20px;
`;

export const ItemTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
`;

export const SubMenu = styled.ul`
  margin-left: 2.2rem;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

export const SubMenuItem = styled.li`
  padding: 0.2rem 0;

  h3 {
    font-size: 14px;
  }
`;
