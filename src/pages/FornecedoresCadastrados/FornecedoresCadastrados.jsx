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
import {
  Modal,
  ModalEditEntradas,
  ModalEditFornecedores,
} from "../../components/Modal/Modal";
import api from "../../services/api";
import { formatCurrency, formatDate } from "../../utils/functions";
import { FormContext } from "../../contexts/FormContext";
import { ClipLoader } from "react-spinners";

const FornecedoresCadastrados = () => {
  const { setFormData } = useContext(FormContext);

  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Inicia o loading
      try {
        const response = await api.get("/fornecedores");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Erro ao buscar fornecedor:", error);
      } finally {
        setLoading(false); // Finaliza o loading
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = () => {
    if (selectedItems.length > 0) {
      setOpenModal(true);
    } else {
      toast.warning("Selecione pelo menos um item para excluir.");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenEditModal = () => {
    if (selectedItems.length === 1) {
      const item = suppliers.find((i) => i.id === selectedItems[0]);
      console.log("Item para edição:", item);
      if (item) {
        setItemToEdit(item);
        setFormData(item, "fornecedor");
        setOpenEditModal(true);
      }
    } else if (selectedItems.length === 0) {
      toast.warning("Selecione um item para editar.");
    } else {
      toast.warning("Selecione apenas um item para editar.");
    }
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setItemToEdit(null);
    handleTableUpdate();
  };

  const handleTableUpdate = async () => {
    setLoading(true); // Inicia o loading
    try {
      const response = await api.get("/fornecedores");
      setSuppliers(response.data);
      toast.info("Lista atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar a lista.");
    } finally {
      setLoading(false); // Finaliza o loading
    }
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const handleDelete = async () => {
    try {
      // Deletar os itens selecionados
      await Promise.all(
        selectedItems.map((id) => api.delete(`/fornecedores/${id}`))
      );

      // Atualizar a lista de fornecedores após a exclusão
      const response = await api.get("/fornecedores");
      setSuppliers(response.data);

      toast.success("Itens deletados com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar itens.");
    } finally {
      handleCloseModal();
      setSelectedItems([]); // Limpa os itens selecionados após a exclusão
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
              onClick={() => handleOpenEditModal(selectedItems[0])}
            ></i>
          </div>
        </Filters>
      </HeaderContainer>

      {loading ? (
        // Exibe o loader enquanto os dados estão carregando
        <LoaderContainer>
          <LoaderCenter>
            <ClipLoader size={50} color={"#75A780"} loading={loading} />
          </LoaderCenter>
        </LoaderContainer>
      ) : (
        // Exibe a tabela quando os dados estão carregados
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
            {suppliers.map((supplier, index) => (
              <tr
                key={index}
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
