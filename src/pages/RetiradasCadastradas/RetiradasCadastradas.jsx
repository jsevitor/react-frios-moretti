import React, { useContext, useEffect, useState } from "react";
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
import { Modal, ModalEditRetiradas } from "../../components/Modal/Modal";
import { formatCustomDate } from "../../utils/functions";
import { FormContext } from "../../contexts/FormContext";
import { ClipLoader } from "react-spinners";
import api from "../../services/api";

/**
 * Componente para exibição e gerenciamento de retiradas cadastradas.
 * Este componente permite visualizar, editar e excluir retiradas no sistema.
 *
 * @component RetiradasCadastradas
 * @returns {JSX.Element} O elemento RetiradasCadastradas.
 * @example
 * // Uso do componente
 *   <RetiradasCadastradas />
 */
const RetiradasCadastradas = () => {
  const { setFormData } = useContext(FormContext);
  const [outputs, setOutputs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Função para buscar dados de retiradas e produtos
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get("/retiradas");
        setOutputs(response.data);
      } catch (error) {
        console.error("Erro ao buscar retiradas:", error);
      } finally {
        setLoading(false);
      }
    };

    // Função para buscar dados de produtos
    const fetchProducts = async () => {
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

    fetchData();
    fetchProducts();
  }, []);

  // Abre o modal de exclusão
  const handleOpenModal = () => {
    if (selectedItems.length > 0) {
      setOpenModal(true);
    } else {
      toast.warning("Selecione pelo menos um item para excluir.");
    }
  };

  // Fecha o modal de exclusão
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Abre o modal de edição e define os dados
  const handleOpenEditModal = () => {
    if (selectedItems.length === 1) {
      const item = outputs.find((i) => i.id === selectedItems[0]);
      if (item) {
        setItemToEdit(item);
        setFormData(item, "retirada");
        setOpenEditModal(true);
      }
    } else if (selectedItems.length === 0) {
      toast.warning("Selecione um item para editar.");
    } else {
      toast.warning("Selecione apenas um item para editar.");
    }
  };

  // Fecha o modal de edição e atualiza a tabela
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setItemToEdit(null);
    handleTableUpdate();
  };

  // Atualiza a tabela de retiradas
  const handleTableUpdate = async () => {
    setLoading(true);
    try {
      const response = await api.get("/retiradas");
      setOutputs(response.data);
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

  // Deleta os itens selecionados
  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedItems.map((id) => api.delete(`/retiradas/${id}`))
      );

      const response = await api.get("/retiradas");
      setOutputs(response.data);

      toast.success("Itens deletados com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar itens.");
    } finally {
      handleCloseModal();
    }
  };

  return (
    <Container>
      <ToastContainer />
      <HeaderContainer>
        <Title>Retiradas Cadastradas</Title>
        <Filters>
          <div className="filter_actions">
            <input
              type="checkbox"
              checked={selectedItems.length === outputs.length}
              onChange={(e) =>
                setSelectedItems(
                  e.target.checked ? outputs.map((p) => p.id) : []
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
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Tipo de saída</th>
              <th>Data de Retirada</th>
              <th>Nº Lote</th>
            </tr>
          </Thead>
          <Tbody>
            {outputs.map((output, index) => (
              <tr
                key={index}
                className={selectedItems.includes(output.id) ? "selected" : ""}
              >
                <td className="middle checkbox">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(output.id)}
                    onChange={() => handleCheckboxChange(output.id)}
                  />
                </td>
                <td>
                  {products.find((product) => product.id === output.produto_id)
                    ?.nome || "Desconhecido"}
                </td>
                <td>{output.quantidade}</td>
                <td>{output.tipo_retirada}</td>
                <td>{formatCustomDate(output.data_retirada)}</td>
                <td>{output.numero_lote}</td>
              </tr>
            ))}
          </Tbody>
        </Table>
      )}

      {openModal && (
        <Modal onConfirm={handleDelete} onCancel={handleCloseModal} />
      )}

      {openEditModal && itemToEdit && (
        <ModalEditRetiradas item={itemToEdit} onClose={handleCloseEditModal} />
      )}
    </Container>
  );
};

export default RetiradasCadastradas;
