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
import { Modal, ModalEditFornecedores } from "../../components/Modal/Modal";
import { FormContext } from "../../contexts/FormContext";
import { ClipLoader } from "react-spinners";
import api from "../../services/api";

/**
 * Componente para exibir a lista de fornecedores cadastrados.
 * Este componente permite visualizar os dados de todos os fornecedores no sistema.
 *
 * @component FornecedoresCadastrados
 @returns {JSX.Element} O elemento FornecedoresCadastrados.
 * @example
 * // Uso do componente
 *   <FornecedoresCadastrados />
 */

const FornecedoresCadastrados = () => {
  const { setFormData } = useContext(FormContext);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    // Busca os fornecedores cadastrados na API.
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get("/fornecedores");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Erro ao buscar fornecedor:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
  const handleCloseModal = () => setOpenModal(false);

  // Abre o modal de edição se apenas um item estiver selecionado.
  const handleOpenEditModal = () => {
    if (selectedItems.length === 1) {
      const item = suppliers.find((i) => i.id === selectedItems[0]);
      if (item) {
        setItemToEdit(item);
        setFormData(item, "fornecedor");
        setOpenEditModal(true);
      }
    } else {
      toast.warning(
        selectedItems.length === 0
          ? "Selecione um item para editar."
          : "Selecione apenas um item para editar."
      );
    }
  };

  // Fecha o modal de edição e atualiza a tabela.
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setItemToEdit(null);
    handleTableUpdate();
  };

  // Atualiza a lista de fornecedores consultando a API.
  const handleTableUpdate = async () => {
    setLoading(true);
    try {
      const response = await api.get("/fornecedores");
      setSuppliers(response.data);
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
        selectedItems.map((id) => api.delete(`/fornecedores/${id}`))
      );
      setSuppliers(
        suppliers.filter((supplier) => !selectedItems.includes(supplier.id))
      );
      toast.success("Itens deletados com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar itens.");
    } finally {
      handleCloseModal();
      setSelectedItems([]);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <HeaderContainer>
        <Title>Fornecedores Cadastrados</Title>
        <Filters>
          <div className="filter_actions">
            <input
              type="checkbox"
              checked={selectedItems.length === suppliers.length}
              onChange={(e) =>
                setSelectedItems(
                  e.target.checked ? suppliers.map((p) => p.id) : []
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
        <LoaderContainer>
          <LoaderCenter>
            <ClipLoader size={50} color={"#75A780"} loading={loading} />
          </LoaderCenter>
        </LoaderContainer>
      ) : (
        <Table>
          <Thead>
            <tr>
              <th className="checkbox"></th>
              <th>Nome</th>
              <th>CNPJ</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Celular</th>
              <th>CEP</th>
              <th>Cidade</th>
              <th>Estado</th>
            </tr>
          </Thead>
          <Tbody>
            {suppliers.map((supplier) => (
              <tr
                key={supplier.id}
                className={
                  selectedItems.includes(supplier.id) ? "selected" : ""
                }
              >
                <td className="middle checkbox">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(supplier.id)}
                    onChange={() => handleCheckboxChange(supplier.id)}
                  />
                </td>
                <td>{supplier.nome}</td>
                <td>{supplier.cnpj}</td>
                <td>{supplier.email}</td>
                <td>{supplier.telefone}</td>
                <td>{supplier.celular}</td>
                <td>{supplier.cep}</td>
                <td>{supplier.cidade}</td>
                <td>{supplier.estado}</td>
              </tr>
            ))}
          </Tbody>
        </Table>
      )}

      {openModal && (
        <Modal onConfirm={handleDelete} onCancel={handleCloseModal} />
      )}
      {openEditModal && itemToEdit && (
        <ModalEditFornecedores
          item={itemToEdit}
          onClose={handleCloseEditModal}
        />
      )}
    </Container>
  );
};

export default FornecedoresCadastrados;
