import { useEffect, useState } from "react";
import {
  Container,
  Filters,
  HeaderContainer,
  Title,
  Table,
  Thead,
  Tbody,
  LoaderContainer,
  LoaderCenter,
} from "./Styles";
import { ToastContainer, toast } from "react-toastify";
import { formatCustomDate } from "../../utils/functions";
import api from "../../services/api";
import { ClipLoader } from "react-spinners"; // Loader spinner

const Movimentacoes = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get("/movimentacoes");
        setMovimentacoes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTableUpdate = async () => {
    setLoading(true);
    try {
      const response = await api.get("/movimentacoes");
      setMovimentacoes(response.data);
      toast.info("Lista atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar a lista.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <HeaderContainer>
        <Title>Movimentações</Title>
        <Filters>
          <div className="filter_actions">
            <i
              className="bi bi-arrow-clockwise"
              onClick={handleTableUpdate}
            ></i>
          </div>
        </Filters>
      </HeaderContainer>
      <LoaderContainer>
        {loading ? (
          <LoaderCenter>
            <ClipLoader size={50} color={"#75A780"} loading={loading} />
          </LoaderCenter>
        ) : (
          <Table>
            <Thead>
              <tr>
                <th>Produto</th>
                <th>Data de Entrada</th>
                <th>Data de Retirada</th>
                <th>Qtde. Total de Entrada</th>
                <th>Qtde. Total de Saída</th>
                <th>Qtde. Total em Estoque</th>
              </tr>
            </Thead>
            <Tbody>
              {movimentacoes.map((item, index) => (
                <tr key={index}>
                  <td>{item.nome}</td>
                  <td>
                    {(item.data_entrada &&
                      formatCustomDate(item.data_entrada)) ||
                      ""}
                  </td>
                  <td>
                    {(item.data_retirada &&
                      formatCustomDate(item.data_retirada)) ||
                      ""}
                  </td>
                  <td>{item.quantidade_total_entrada}</td>
                  <td>{item.quantidade_total_saida}</td>
                  <td>{item.quantidade_em_estoque}</td>
                </tr>
              ))}
            </Tbody>
          </Table>
        )}
      </LoaderContainer>
    </Container>
  );
};

export default Movimentacoes;
