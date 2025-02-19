import styled from "styled-components";
import { colors } from "../../styles/Variables";

export const Container = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  bottom: 0;
`;

export const Text = styled.p`
  font-size: 0.625rem;
  color: ${colors.footer};
`;

export const Link = styled.a`
  font-size: 0.625rem;
  color: ${colors.green};
`;
