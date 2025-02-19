import React from "react";
import { Container, Link, Text } from "./Styles";

/**
 * Componente de rodapé reutilizável.
 * Este componente exibe um rodapé com informações de direitos autorais e um link para o desenvolvedor.
 *
 * @component Footer
 * @returns {JSX.Element} O elemento Footer.
 * @example
 * // Exemplo de uso do Footer
 * <Footer />
 */
const Footer = () => {
  return (
    <Container>
      <Text>© 2024 FRIOS MORETTI.</Text>
      <Text> Todos os direitos reservados.</Text>
      <Text>
        {" "}
        Desenvolvido por
        <Link href="https://github.com/jsevitor"> Vitor Oliveira</Link>.
      </Text>
    </Container>
  );
};

export default Footer;
