import {
  BsArrowLeftRight,
  BsBoxSeam,
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsChevronUp,
  BsHouse,
  BsTruck,
} from "react-icons/bs";
import {
  Container,
  HideMenu,
  Icon,
  ItemTitle,
  MenuItem,
  MenuItems,
  NavContainer,
  SubMenu,
  SubMenuItem,
} from "./Styles";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";

/**
 * Componente de barra lateral de navegação.
 * Este componente exibe um menu lateral com opções de navegação, permitindo expandir e colapsar submenus.
 *
 * @component SideBar
 * @param {Object} props - As propriedades do componente.
 * @param {boolean} props.active - Define se a barra lateral está visível.
 * @param {boolean} props.menuCollapsed - Indica se o menu está colapsado.
 * @param {Function} props.setMenuCollapsed - Função para alternar o estado do menu.
 * @returns {JSX.Element} O elemento SideBar.
 *
 * @example
 * <SideBar active={isActive} menuCollapsed={isCollapsed} setMenuCollapsed={setCollapsed} />
 */
const SideBar = ({ active, menuCollapsed, setMenuCollapsed }) => {
  const [subMenus, setSubMenus] = useState({
    produtos: localStorage.getItem("isOpenProdutosSubMenu") === "true",
    cadastros: localStorage.getItem("isOpenCadastrosSubMenu") === "true",
    movimentacoes:
      localStorage.getItem("isOpenMovimentacoesSubMenu") === "true",
  });

  // Atualiza o localStorage sempre que os estados dos submenus ou do menu principal mudam
  useEffect(() => {
    localStorage.setItem("isOpenProdutosSubMenu", subMenus.produtos);
    localStorage.setItem("isOpenCadastrosSubMenu", subMenus.cadastros);
    localStorage.setItem("isOpenMovimentacoesSubMenu", subMenus.movimentacoes);
    localStorage.setItem("menuCollapsed", menuCollapsed);
  }, [subMenus, menuCollapsed]);

  /**
   * Alterna a visibilidade de um submenu específico.
   * @param {string} menu - O identificador do submenu a ser alternado.
   */
  const toggleSubMenu = (menu) => {
    setSubMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));

    if (menuCollapsed) {
      setMenuCollapsed(false);
    }
  };

  // Alterna entre expandir e colapsar o menu lateral.
  const toggleMenu = () => {
    setMenuCollapsed(!menuCollapsed);
    setSubMenus({ produtos: false, cadastros: false, movimentacoes: false });
  };

  return (
    <Container sidebar={active} className={menuCollapsed ? "collapsed" : ""}>
      <HideMenu
        onClick={toggleMenu}
        className={menuCollapsed ? "collapsed" : ""}
      >
        <Icon as={menuCollapsed ? BsChevronLeft : BsChevronRight} />
      </HideMenu>
      <hr />
      <NavContainer>
        <MenuItems className={menuCollapsed ? "collapsed" : ""}>
          <MenuItem>
            <Link to="/">
              <Icon as={BsHouse} />
              {!menuCollapsed && <ItemTitle>Início</ItemTitle>}
            </Link>
          </MenuItem>

          <MenuItem>
            <Link to="#" onClick={() => toggleSubMenu("cadastros")}>
              <Icon as={BsTruck} />
              {!menuCollapsed && <ItemTitle>Fornecedores</ItemTitle>}
              {!menuCollapsed && (
                <Icon as={subMenus.cadastros ? BsChevronUp : BsChevronDown} />
              )}
            </Link>
            {!menuCollapsed && (
              <SubMenu isOpen={subMenus.cadastros}>
                <SubMenuItem>
                  <Link to="/cadastro-fornecedor">
                    <ItemTitle>Cadastrar Fornecedor</ItemTitle>
                  </Link>
                  <Link to="/fornecedores">
                    <ItemTitle>Fornecedores Cadastrados</ItemTitle>
                  </Link>
                </SubMenuItem>
              </SubMenu>
            )}
          </MenuItem>

          <MenuItem>
            <Link to="#" onClick={() => toggleSubMenu("produtos")}>
              <Icon as={BsBoxSeam} />
              {!menuCollapsed && <ItemTitle>Produtos</ItemTitle>}
              {!menuCollapsed && (
                <Icon as={subMenus.produtos ? BsChevronUp : BsChevronDown} />
              )}
            </Link>
            {!menuCollapsed && (
              <SubMenu isOpen={subMenus.produtos}>
                <SubMenuItem>
                  <Link to="/cadastro-produto">
                    <ItemTitle>Cadastrar Produto</ItemTitle>
                  </Link>
                  <Link to="/entrada-produtos">
                    <ItemTitle>Cadastrar Entrada</ItemTitle>
                  </Link>
                  <Link to="/retirada-produtos">
                    <ItemTitle>Cadastrar Retirada</ItemTitle>
                  </Link>
                  <Link to="/produtos-cadastrados">
                    <ItemTitle>Produtos Cadastrados</ItemTitle>
                  </Link>
                  <Link to="/entradas">
                    <ItemTitle>Entradas Cadastradas</ItemTitle>
                  </Link>
                  <Link to="/retiradas">
                    <ItemTitle>Retiradas Cadastradas</ItemTitle>
                  </Link>
                </SubMenuItem>
              </SubMenu>
            )}
          </MenuItem>

          <MenuItem>
            <Link to="/movimentacoes">
              <Icon as={BsArrowLeftRight} />
              {!menuCollapsed && <ItemTitle>Movimentações</ItemTitle>}
            </Link>
          </MenuItem>
        </MenuItems>
      </NavContainer>
      {!menuCollapsed && <Footer />}
    </Container>
  );
};

export default SideBar;
