import { Container, MenuButton, Title } from "./Styles";
import { useState } from "react";
import SideBar from "../SideBar/SideBar";

/**
 * Componente de cabeçalho que inclui um título e um botão de menu que abre uma barra lateral.
 * Este componente exibe um cabeçalho com um título e um botão de menu que alterna a visibilidade de uma barra lateral.
 *
 * @component Header
 * @returns {JSX.Element} O elemento Header.
 * @example
 * // Uso do Header
 * <Header />
 */
const Header = () => {
  const [sidebar, setSidebar] = useState(false);

  //  Função para alternar o estado da barra lateral entre aberto e fechado.
  const toggleSidebar = () => setSidebar(!sidebar);

  //  Função para fechar a barra lateral.
  const closeSidebar = () => setSidebar(false);

  return (
    <Container>
      <Title>
        FRIOS<span>MORETTI</span>
      </Title>
      {!sidebar ? (
        <MenuButton className={"bi bi-list"} onClick={toggleSidebar} />
      ) : (
        <MenuButton className={"bi bi-x-lg"} onClick={closeSidebar} />
      )}
      {sidebar && <SideBar active={setSidebar} closeSidebar={closeSidebar} />}
    </Container>
  );
};

export default Header;
