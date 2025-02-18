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
} from "./Styles"; // Certifique-se de importar os novos estilos do loader
import { ToastContainer, toast } from "react-toastify";
import { Modal, ModalEditEntradas } from "../../components/Modal/Modal";
import api from "../../services/api";
import { formatCurrency, formatCustomDate } from "../../utils/functions";
import { FormContext } from "../../contexts/FormContext";
import { ClipLoader } from "react-spinners"; // Importando o loader

const EntradasCadastradas = () => {
  const { setFormData } = useContext(FormContext);
  const [inputs, setInputs] = useState([]);
  const [loading, setLoading] = useState(false); // Novo estado para controlar o carregamento
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Inicia o loading
      try {
        const response = await api.get("/entradas");
        setInputs(response.data);
      } catch (error) {
        console.error("Erro ao buscar entradas:", error);
      } finally {
        setLoading(false); // Finaliza o loading
      }
    };

    const fetchProducts = async () => {
      setLoading(true); // Inicia o loading
      try {
        const response = await api.get("/produtos");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false); // Finaliza o loading
      }
    };

    const fetchSuppliers = async () => {
      setLoading(true); // Inicia o loading
      try {
        const response = await api.get("/fornecedores");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
      } finally {
        setLoading(false); // Finaliza o loading
      }
    };

    fetchData();
    fetchProducts();
    fetchSuppliers();
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
      const item = inputs.find((i) => i.id === selectedItems[0]);
      if (item) {
        setItemToEdit(item);
        setFormData(item, "entrada"); // Passar o tipo de formulário corretamente
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
      const response = await api.get("/entradas");
      setInputs(response.data);
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
        selectedItems.map((id) => api.delete(`/entradas/${id}`))
      );

      // Atualizar a lista de entradas após a exclusão
      const response = await api.get("/entradas");
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
        <Title>Entradas Cadastradas</Title>
        <Filters>
          <div className="filter_actions">
            <input
              type="checkbox"
              checked={selectedItems.length === inputs.length}
              onChange={(e) =>
                setSelectedItems(
                  e.target.checked ? inputs.map((p) => p.id) : []
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
              <th>Fornecedor</th>
              <th>Data de Entrada</th>
              <th>Nº Lote</th>
              <th>Custo</th>
            </tr>
          </Thead>
          <Tbody>
            {inputs.map((input, index) => (
              <tr
                key={index}
                className={selectedItems.includes(input.id) ? "selected" : ""}
              >
                <td className="middle checkbox">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(input.id)}
                    onChange={() => handleCheckboxChange(input.id)}
                  />
                </td>
                <td>
                  {products.find((product) => product.id === input.produto_id)
                    ?.nome || "Desconhecido"}
                </td>
                <td>{input.quantidade}</td>
                <td>
                  {suppliers.find(
                    (supplier) => supplier.id === input.fornecedor_id
                  )?.nome || "Desconhecido"}
                </td>
                <td>{formatCustomDate(input.data_entrada)}</td>
                <td>{input.numero_lote}</td>
                <td>{formatCurrency(input.preco_compra)}</td>
              </tr>
            ))}
          </Tbody>
        </Table>
      )}

      {openModal && (
        <Modal onConfirm={handleDelete} onCancel={handleCloseModal} />
      )}

      {openEditModal && itemToEdit && (
        <ModalEditEntradas item={itemToEdit} onClose={handleCloseEditModal} />
      )}
    </Container>
  );
};

export default EntradasCadastradas;
