import { Routes, Route } from "react-router-dom";
import CadastroFornecedor from "./pages/CadastroFornecedor/CadastroFornecedor";
import CadastroProduto from "./pages/CadastroProduto/CadastroProduto";
import EntradaProduto from "./pages/ProdutosEntrada/EntradaProdutos";
import RetiradaProdutos from "./pages/ProdutosRetirada/RetiradaProdutos";
import ProdutosCadastrados from "./pages/ProdutosCadastrados/ProdutosCadastrados";
import Home from "./pages/Home/Home";
import Movimentacoes from "./pages/Movimentacoes/Movimentacoes";
import EntradasCadastradas from "./pages/EntradasCadastradas/EntradasCadastradas";
import RetiradasCadastradas from "./pages/RetiradasCadastradas/RetiradasCadastradas";
import FornecedoresCadastrados from "./pages/FornecedoresCadastrados/FornecedoresCadastrados";

/**
 * Definição das rotas da aplicação.
 *
 * - Utiliza `react-router-dom` para gerenciar a navegação entre páginas.
 * - Define cada rota associada a um componente específico.
 * - A rota `index` representa a página inicial (`Home`).
 * - As demais rotas mapeiam diferentes seções da aplicação, como cadastro de produtos,
 *   movimentações, entradas e retiradas.
 */

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/cadastro-fornecedor" element={<CadastroFornecedor />} />
      <Route path="/cadastro-produto" element={<CadastroProduto />} />
      <Route path="/entrada-produtos" element={<EntradaProduto />} />
      <Route path="/retirada-produtos" element={<RetiradaProdutos />} />
      <Route path="/movimentacoes" element={<Movimentacoes />} />
      <Route path="/produtos-cadastrados" element={<ProdutosCadastrados />} />
      <Route path="/entradas" element={<EntradasCadastradas />} />
      <Route path="/retiradas" element={<RetiradasCadastradas />} />
      <Route path="/fornecedores" element={<FornecedoresCadastrados />} />
    </Routes>
  );
}
