import { useContext, useEffect, useState } from "react";
import { ButtonContainer, FormContainer } from "./Styles";
import { FormContext } from "../../contexts/FormContext";
import { ToastContainer, toast } from "react-toastify";
import { InputField, SelectField } from "../../components/Form/Form";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import api from "../../services/api";

/**
 * Componente responsável pelo formulário de entrada de produtos.
 * Permite cadastrar a entrada de produtos, validando os campos obrigatórios
 * e enviando os dados para a API.
 *
 * @component EntradaProdutos
 * @returns {JSX.Element} O elemento EntradaProdutos.
 * @example
 * // Uso do componente
 *   <EntradaProdutos />
 */
const EntradaProdutos = () => {
  const { entradaData, handleChange, handleCancel } = useContext(FormContext);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    handleCancel();
    // Busca os produtos cadastrados na API.
    const fetchProducts = async () => {
      try {
        const response = await api.get("/produtos");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    // Busca os fornecedores cadastrados na API.
    const fetchSuppliers = async () => {
      try {
        const response = await api.get("/fornecedores");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
      }
    };

    fetchProducts();
    fetchSuppliers();
  }, []);

  /**
   * Valida os campos obrigatórios do formulário.
   * @returns {boolean} Retorna true se os campos forem válidos, caso contrário false.
   */
  const validateFields = () => {
    const validationErrors = {};
    const requiredFields = [
      "produto_id",
      "quantidade",
      "fornecedor_id",
      "data_entrada",
      "numero_lote",
      "preco_compra",
    ];

    requiredFields.forEach((field) => {
      if (!entradaData[field]) {
        validationErrors[field] = `O campo ${field.replace(
          "_",
          " "
        )} é obrigatório.`;
      }
    });

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  /**
   * Manipula mudanças nos campos do formulário e ajusta automaticamente o fornecedor, se aplicável.
   * @param {object} e - Evento de mudança do campo.
   */
  const handleFieldChange = async (e) => {
    const { name, value } = e.target;
    handleChange(e, "entrada");
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : prevErrors[name],
    }));

    if (name === "produto_id" && value) {
      try {
        const response = await api.get(`/produtos/${value}`);
        const selectedProduct = response.data;

        handleChange(
          {
            target: {
              name: "fornecedor_id",
              value: selectedProduct.fornecedor_id || "",
            },
          },
          "entrada"
        );
      } catch (error) {
        console.error("Erro ao buscar fornecedor do produto:", error);
        toast.error("Erro ao carregar fornecedor do produto.");
      }
    }
  };

  //  Reseta o formulário e remove os erros de validação.
  const handleReset = () => {
    handleCancel();
    setErrors({});
  };

  // Submete o formulário de entrada de produtos.
  const handleSubmit = async () => {
    if (!validateFields()) {
      toast.warning("Preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/entradas", entradaData);
      toast.success("Entrada cadastrada com sucesso!");
      handleCancel();
    } catch (error) {
      console.error("Erro ao adicionar entrada:", error);
      toast.error("Erro ao adicionar entrada.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card title="Entrada de Produto" icon="bi bi-download">
      <ToastContainer />
      <FormContainer>
        <SelectField
          label="Produto"
          name="produto_id"
          value={entradaData.produto_id || ""}
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
          label="Quantidade"
          name="quantidade"
          value={entradaData.quantidade || ""}
          onChange={handleFieldChange}
          warn={errors.quantidade}
        />
        <SelectField
          label="Fornecedor"
          name="fornecedor_id"
          value={entradaData.fornecedor_id || ""}
          onChange={handleFieldChange}
          warn={errors.fornecedor_id}
        >
          <option value="">Selecione</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.nome}
            </option>
          ))}
        </SelectField>
        <InputField
          label="Data de Entrada"
          name="data_entrada"
          type="date"
          value={entradaData.data_entrada || ""}
          onChange={handleFieldChange}
          warn={errors.data_entrada}
        />
        <InputField
          label="Número de Lote"
          name="numero_lote"
          value={entradaData.numero_lote || ""}
          onChange={handleFieldChange}
          warn={errors.numero_lote}
        />
        <InputField
          label="Preço de Compra"
          name="preco_compra"
          type="number"
          value={entradaData.preco_compra || ""}
          onChange={handleFieldChange}
          warn={errors.preco_compra}
        />
      </FormContainer>
      <ButtonContainer>
        <Button
          label="Adicionar"
          onClick={handleSubmit}
          disabled={isSubmitting}
        />
        <Button
          label="Cancelar"
          onClick={handleReset}
          disabled={isSubmitting}
        />
      </ButtonContainer>
    </Card>
  );
};

export default EntradaProdutos;
