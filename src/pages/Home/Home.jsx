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

/**
 * Componente da página inicial.
 * Exibe um layout de boas-vindas com título, slogan e imagens ilustrativas.
 *
 * @component Home
 * @returns {JSX.Element} O elemento Home.
 * @example
 * // Uso do componente
 *   <Home />
 */
const Home = () => {
  return (
    <Container>
      {/* Seção da esquerda com texto de boas-vindas, título e slogan */}
      <Left_Container>
        <Welcome>Bem-vindo à,</Welcome>
        <Title>
          FRIOS<span>MORETTI</span>
        </Title>
        <Slogan>
          Controle <span>Perfeito</span>, Estoque <span>Sempre</span> Fresco
        </Slogan>
      </Left_Container>

      {/* Seção da direita com imagens ilustrativas */}
      <Right_Container>
        <Grid>
          <ImageSmall src="./frios1.jpg" alt="Imagem de frios 1" />
          <ImageSmall src="./frios2.jpg" alt="Imagem de frios 2" />
          <ImageSmall src="./frios3.jpg" alt="Imagem de frios 3" />
          <ImageSmall src="./frios5.jpg" alt="Imagem de frios 4" />
        </Grid>
        <ImageBig src="./frios-big.jpg" alt="Imagem principal de frios" />
      </Right_Container>
    </Container>
  );
};

export default Home;
