import { useContext, useEffect, useState } from "react";
import { ButtonContainer, FormContainer } from "./Styles";
import { InputField, SelectField } from "../../components/Form/Form";
import { FormContext } from "../../contexts/FormContext";
import { ToastContainer, toast } from "react-toastify";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import api from "../../services/api";

/**
 * Componente para registrar a retirada de produtos.
 * Permite cadastrar a retirada de produtos, validando os campos obrigatórios
 * e enviando os dados para a API.
 *
 * @component RetiradaProdutos
 * @returns {JSX.Element} O elemento RetiradaProdutos.
 * @example
 * // Uso do componente
 *   <RetiradaProdutos />
 */
const RetiradaProdutos = () => {
  const { retiradaData, handleChange, handleCancel } = useContext(FormContext);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    handleCancel();
    const fetchProducts = async () => {
      try {
        const response = await api.get("/produtos");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  /**
   * Valida os campos obrigatórios do formulário.
   * @returns {boolean} Retorna true se todos os campos obrigatórios forem preenchidos.
   */
  const validateFields = () => {
    let validationErrors = {};

    if (!retiradaData.produto_id) {
      validationErrors.produto_id = "O campo Produto é obrigatório.";
    }
    if (!retiradaData.quantidade) {
      validationErrors.quantidade = "O campo Quantidade é obrigatório.";
    }
    if (!retiradaData.tipo_retirada) {
      validationErrors.tipo_retirada = "O campo Tipo de Saída é obrigatório.";
    }
    if (!retiradaData.data_retirada) {
      validationErrors.data_retirada =
        "O campo Data de Retirada é obrigatório.";
    }
    if (!retiradaData.numero_lote) {
      validationErrors.numero_lote = "O campo Número de Lote é obrigatório.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  /**
   * Lida com mudanças nos campos do formulário.
   * @param {Object} e Evento de mudança no campo.
   */
  const handleFieldChange = async (e) => {
    const { name, value } = e.target;
    handleChange(e, "retirada");
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : prevErrors[name],
    }));
  };

  //  Reseta o formulário.
  const handleReset = () => {
    handleCancel();
    setErrors({});
  };

  //  Envia os dados da retirada para a API.
  const handleSubmit = async () => {
    if (!validateFields()) {
      toast.warning("Preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post("/retiradas", retiradaData);
      console.log("Retirada adicionada:", response.data);
      toast.success("Retirada cadastrada com sucesso!");
      handleCancel();
    } catch (error) {
      console.error("Erro ao adicionar Retirada:", error);
      toast.error("Erro ao adicionar Retirada.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card title={"Retirada de Produto"} icon={"bi bi-upload"}>
      <ToastContainer />
      <FormContainer>
        <SelectField
          label={"Produto"}
          name={"produto_id"}
          value={retiradaData.produto_id || ""}
          onChange={handleFieldChange}
          warn={errors.produto_id}
        >
          <option value="">Selecione</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.nome}
            </option>
          ))}
        </SelectField>
        <InputField
          label={"Número de Lote"}
          name={"numero_lote"}
          value={retiradaData.numero_lote || ""}
          onChange={handleFieldChange}
          warn={errors.numero_lote}
        />
        <InputField
          label={"Quantidade"}
          name={"quantidade"}
          value={retiradaData.quantidade || ""}
          onChange={handleFieldChange}
          warn={errors.quantidade}
        />
        <InputField
          label={"Data de Retirada"}
          name={"data_retirada"}
          type={"date"}
          value={retiradaData.data_retirada || ""}
          onChange={handleFieldChange}
          warn={errors.data_retirada}
        />
        <InputField
          label={"Tipo de Saída"}
          name={"tipo_retirada"}
          value={retiradaData.tipo_retirada || ""}
          onChange={handleFieldChange}
          warn={errors.tipo_retirada}
        />
      </FormContainer>
      <ButtonContainer>
        <Button
          label={"Adicionar"}
          onClick={handleSubmit}
          disabled={isSubmitting}
        />
        <Button
          label={"Cancelar"}
          onClick={handleReset}
          disabled={isSubmitting}
        />
      </ButtonContainer>
    </Card>
  );
};

export default RetiradaProdutos;
