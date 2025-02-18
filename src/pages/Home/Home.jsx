import React from "react";
import {
  Container,
  Grid,
  ImageBig,
  ImageSmall,
  Left_Container,
  Right_Container,
  Slogan,
  Title,
  Welcome,
} from "./Style";

const Home = () => {
  return (
    <Container>
      <Left_Container>
        <Welcome>Bem-vindo à,</Welcome>
        <Title>
          FRIOS<span>MORETTI</span>
        </Title>
        <Slogan>
          Controle <span>Perfeito</span>, Estoque <span>Sempre</span> Fresco
        </Slogan>
      </Left_Container>
      <Right_Container>
        <Grid>
          <ImageSmall src="./frios1.jpg" />
          <ImageSmall src="./frios2.jpg" />
          <ImageSmall src="./frios3.jpg" />
          <ImageSmall src="./frios5.jpg" />
        </Grid>
        <ImageBig src="./frios-big.jpg" />
      </Right_Container>
    </Container>
  );
};

export default Home;
