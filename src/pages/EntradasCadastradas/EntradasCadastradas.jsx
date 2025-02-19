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
import { Modal, ModalEditEntradas } from "../../components/Modal/Modal";
import { formatCurrency, formatCustomDate } from "../../utils/functions";
import { FormContext } from "../../contexts/FormContext";
import { ClipLoader } from "react-spinners";
import api from "../../services/api";

/**
 * Componente para exibição e gerenciamento de entradas cadastradas.
 * Este componente permite visualizar, editar e excluir entradas no sistema.
 *
 * @component EntradasCadastradas
 * @returns {JSX.Element} O elemento EntradasCadastradas.
 * @example
 * // Uso do componente
 *   <EntradasCadastradas />
 */

const EntradasCadastradas = () => {
  const { setFormData } = useContext(FormContext);
  const [inputs, setInputs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Função para buscar dados de entradas, produtos e fornecedores
    const fetchData = async (endpoint, setter) => {
      setLoading(true);
      try {
        const response = await api.get(endpoint);
        setter(response.data);
      } catch (error) {
        console.error(`Erro ao buscar dados de ${endpoint}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData("/entradas", setInputs);
    fetchData("/produtos", setProducts);
    fetchData("/fornecedores", setSuppliers);
  }, []);

  // Abre o modal de edição de entrada
  const handleOpenEditModal = () => {
    if (selectedItems.length === 1) {
      const item = inputs.find((i) => i.id === selectedItems[0]);
      if (item) {
        setItemToEdit(item);
        setFormData(item, "entrada");
        setOpenEditModal(true);
      }
    } else {
      toast.warning("Selecione apenas um item para editar.");
    }
  };

  // Deleta itens selecionados
  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedItems.map((id) => api.delete(`/entradas/${id}`))
      );
      setInputs(inputs.filter((input) => !selectedItems.includes(input.id)));
      toast.success("Itens deletados com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar itens.");
    } finally {
      setOpenModal(false);
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
            <i className="bi bi-trash3" onClick={() => setOpenModal(true)}></i>
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
                    onChange={() =>
                      setSelectedItems((prev) =>
                        prev.includes(input.id)
                          ? prev.filter((id) => id !== input.id)
                          : [...prev, input.id]
                      )
                    }
                  />
                </td>
                <td>
                  {products.find((p) => p.id === input.produto_id)?.nome ||
                    "Desconhecido"}
                </td>
                <td>{input.quantidade}</td>
                <td>
                  {suppliers.find((s) => s.id === input.fornecedor_id)?.nome ||
                    "Desconhecido"}
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
        <Modal onConfirm={handleDelete} onCancel={() => setOpenModal(false)} />
      )}
      {openEditModal && itemToEdit && (
        <ModalEditEntradas
          item={itemToEdit}
          onClose={() => setOpenEditModal(false)}
        />
      )}
    </Container>
  );
};

export default EntradasCadastradas;
