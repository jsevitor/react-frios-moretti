import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Global } from "./styles/Global";

import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import MainContent from "./pages/MainContent/MainContent";

/**
 * Componente principal da aplicação.
 *
 * - Gerencia o estado do menu lateral (expandido ou colapsado).
 * - Aplica estilos globais à aplicação.
 * - Renderiza o cabeçalho, a barra lateral e o conteúdo principal.
 */
function App() {
  // Estado para controlar se o menu lateral está colapsado ou não
  const [menuCollapsed, setMenuCollapsed] = useState(() => {
    return localStorage.getItem("menuCollapsed") === "true";
  });

  return (
    <BrowserRouter>
      {/* Aplica os estilos globais */}
      <Global />
      {/* Renderiza o cabeçalho */}
      <Header />
      {/* Renderiza a barra lateral com controle de colapso */}
      <SideBar
        menuCollapsed={menuCollapsed}
        setMenuCollapsed={setMenuCollapsed}
      />
      {/* Renderiza o conteúdo principal, ajustando conforme o estado do menu */}
      <MainContent menuCollapsed={menuCollapsed} />
    </BrowserRouter>
  );
}

export default App;
