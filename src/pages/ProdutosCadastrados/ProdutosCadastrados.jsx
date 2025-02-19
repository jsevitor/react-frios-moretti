import { useContext, useEffect, useState } from "react";
import {
  Container,
  Filters,
  HeaderContainer,
  Table,
  Tbody,
  Thead,
  Title,
  LoaderContainer,
  LoaderCenter,
} from "./Styles";
import { ToastContainer, toast } from "react-toastify";
import { Modal, ModalEditProdutos } from "../../components/Modal/Modal";
import { FormContext } from "../../contexts/FormContext";
import { ClipLoader } from "react-spinners";
import api from "../../services/api";

/**
 * Componente para exibição e gerenciamento de produtos cadastrados.
 * Este componente permite visualizar, editar e excluir produtos.
 *
 * @component ProdutosCadastrados
 * @returns {JSX.Element} O elemento ProdutosCadastrados.
 * @example
 * // Uso do componente
 *   <ProdutosCadastrados />
 */

const ProdutosCadastrados = () => {
  const { setFormData } = useContext(FormContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Busca os produtos cadastrados na API.
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get("/produtos");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    // Busca os fornecedores cadastrados na API.
    const fetchSuppliers = async () => {
      setLoading(true);
      try {
        const response = await api.get("/fornecedores");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchSuppliers();
  }, []);

  // Abre o modal de exclusão se houver itens selecionados.
  const handleOpenModal = () => {
    if (selectedItems.length > 0) {
      setOpenModal(true);
    } else {
      toast.warning("Selecione pelo menos um item para excluir.");
    }
  };

  // Fecha o modal de exclusão.
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Abre o modal de edição se apenas um item estiver selecionado.
  const handleOpenEditModal = () => {
    if (selectedItems.length === 1) {
      const item = products.find((i) => i.id === selectedItems[0]);
      if (item) {
        setItemToEdit(item);
        setFormData(item, "produto");
        setOpenEditModal(true);
      }
    } else if (selectedItems.length === 0) {
      toast.warning("Selecione um item para editar.");
    } else {
      toast.warning("Selecione apenas um item para editar.");
    }
  };

  // Fecha o modal de edição e atualiza a tabela.
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setItemToEdit(null);
    handleTableUpdate();
  };

  // Atualiza a lista de produtos consultando a API.
  const handleTableUpdate = async () => {
    setLoading(true);
    try {
      const response = await api.get("/produtos");
      setProducts(response.data);
      toast.info("Lista atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar a lista.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Gerencia a seleção de itens na tabela.
   * @param {number} itemId - ID do item selecionado.
   */
  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  // Deleta os itens selecionados chamando a API.
  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedItems.map((id) => api.delete(`/produtos/${id}`))
      );

      const response = await api.get("/produtos");
      setProducts(response.data);

      toast.success("Itens deletados com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar itens:", error);
      toast.error("Erro ao deletar itens.");
    } finally {
      handleCloseModal();
    }
  };

  return (
    <Container>
      <ToastContainer />
      <HeaderContainer>
        <Title>Produtos Cadastrados</Title>
        <Filters>
          <div className="filter_actions">
            <input
              type="checkbox"
              checked={selectedItems.length === products.length}
              onChange={(e) =>
                setSelectedItems(
                  e.target.checked ? products.map((p) => p.id) : []
                )
              }
            />
            <i
              className="bi bi-arrow-clockwise"
              onClick={handleTableUpdate}
            ></i>
            <i className="bi bi-trash3" onClick={handleOpenModal}></i>
            <i
              className="bi bi-pencil-square"
              onClick={handleOpenEditModal}
            ></i>
          </div>
        </Filters>
      </HeaderContainer>

      {loading ? (
        // Exibe o loader enquanto os dados estão sendo carregados
        <LoaderContainer>
          <LoaderCenter>
            <ClipLoader size={50} color={"#75A780"} loading={loading} />
          </LoaderCenter>
        </LoaderContainer>
      ) : (
        // Exibe a tabela quando os dados estiverem carregados
        <Table>
          <Thead>
            <tr>
              <th className="checkbox"></th>
              <th className="middle">Foto</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Fornecedor</th>
              <th>Marca</th>
            </tr>
          </Thead>
          <Tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className={selectedItems.includes(product.id) ? "selected" : ""}
              >
                <td className="middle checkbox">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                </td>
                <td className="middle">
                  <img
                    src={
                      product.picture
                        ? product.picture
                        : "https://st2.depositphotos.com/1561359/12101/v/380/depositphotos_121012076-stock-illustration-blank-photo-icon.jpg"
                    }
                    alt={product.nome}
                  />
                </td>
                <td>{product.nome}</td>
                <td>{product.categoria}</td>
                <td>
                  {
                    // Verificação condicional para obter o nome do fornecedor
                    suppliers.find(
                      (supplier) => supplier.id === product.fornecedor_id
                    )?.nome || "Desconhecido"
                  }
                </td>
                <td>{product.marca}</td>
              </tr>
            ))}
          </Tbody>
        </Table>
      )}

      {openModal && (
        <Modal onConfirm={handleDelete} onCancel={handleCloseModal} />
      )}

      {openEditModal && itemToEdit && (
        <ModalEditProdutos item={itemToEdit} onClose={handleCloseEditModal} />
      )}
    </Container>
  );
};

export default ProdutosCadastrados;
