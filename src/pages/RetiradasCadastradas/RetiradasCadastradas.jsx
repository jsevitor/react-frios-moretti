import { useContext, useEffect, useState } from "react";
import {
  Container,
  Filters,
  HeaderContainer,
  Table,
  Tbody,
  Thead,
  Title,
} from "./Styles";
import { ToastContainer, toast } from "react-toastify";
import { Modal, ModalEditRetiradas } from "../../components/Modal/Modal";
import api from "../../services/api";
import { formatCurrency, formatDate } from "../../utils/functions";
import { FormContext } from "../../contexts/FormContext";

const RetiradasCadastradas = () => {
  const { setFormData } = useContext(FormContext);
  const [outputs, setOutputs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/retiradas");
        setOutputs(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
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
      const item = outputs.find((i) => i.id === selectedItems[0]);
      console.log("Item para edição:", item);
      if (item) {
        setItemToEdit(item);
        setFormData(item, "retirada"); // Passar o tipo de formulário corretamente
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
    try {
      const response = await api.get("/retiradas");
      setOutputs(response.data);
      toast.info("Lista atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar a lista.");
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
        selectedItems.map((id) => api.delete(`/retiradas/${id}`))
      );

      // Atualizar a lista de retiradas após a exclusão
      const response = await api.get("/retiradas");
      setInputs(response.data);

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
              onClick={() =>
                handleOpenEditModal(
                  selectedItems[0] // Assumindo que você só pode editar um item por vez
                )
              }
            ></i>
            <i className="bi bi-filter"></i>
          </div>
          <div className="filter_search">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Pesquisar" />
          </div>
        </Filters>
      </HeaderContainer>
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
              <td>{output.produto}</td>
              <td>{output.quantidade}</td>
              <td>{output.tipo_saida}</td>
              <td>{output.data_retirada}</td>
              <td>{output.numero_lote}</td>
            </tr>
          ))}
        </Tbody>
      </Table>

      {openModal && (
        <Modal
          onConfirm={handleDeleteProduct}
          onCancel={handleCloseModal}
          inputs={selectedItems}
        />
      )}

      {openEditModal && itemToEdit && (
        <ModalEditRetiradas item={itemToEdit} onClose={handleCloseEditModal} />
      )}
    </Container>
  );
};

export default RetiradasCadastradas;
