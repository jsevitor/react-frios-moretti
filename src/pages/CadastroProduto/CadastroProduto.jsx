import { useContext, useEffect, useState } from "react";
import { ButtonContainer, FormContainer } from "./Styles";
import { ToastContainer, toast } from "react-toastify";
import { FormContext } from "../../contexts/FormContext";
import { InputField, SelectField } from "../../components/Form/Form";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import "react-toastify/dist/ReactToastify.min.css";
import api from "../../services/api";

/**
 * Componente de cadastro de produtos.
 * Este componente permite adicionar ou editar produtos no sistema.
 *
 * @param {boolean} isEditing - Indica se o formulário está em modo de edição.
 * @component CadastroProduto
 * @returns {JSX.Element} O elemento CadastroProduto.
 * @example
 * // Uso do componente
 *   <CadastroProduto />
 */
const CadastroProduto = ({ isEditing = false }) => {
  const { produtoData, handleChange, handleCancel } = useContext(FormContext);

  const [suppliers, setSuppliers] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    handleCancel();
    const fetchData = async () => {
      try {
        const response = await api.get("/fornecedores");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
        toast.error("Erro ao buscar fornecedores.");
      }
    };

    fetchData();
  }, []);

  /**
   * Valida os campos obrigatórios do formulário.
   * @returns {boolean} Retorna true se todos os campos obrigatórios estiverem preenchidos.
   */
  const validateFields = () => {
    let validationErrors = {};

    if (!produtoData.nome)
      validationErrors.nome = "O campo Nome é obrigatório.";
    if (!produtoData.categoria)
      validationErrors.categoria = "O campo Categoria é obrigatório.";
    if (!produtoData.fornecedor_id)
      validationErrors.fornecedor_id = "O campo Fornecedor é obrigatório.";
    if (!produtoData.marca)
      validationErrors.marca = "O campo Marca é obrigatório.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  /**
   * Manipula mudanças nos campos do formulário.
   * @param {Event} e - Evento de mudança de input.
   */
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    handleChange(e, "produto");
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : prevErrors[name],
    }));
  };

  // Reseta o formulário e limpa os erros.
  const handleReset = () => {
    handleCancel();
    setErrors({});
  };

  //  Envia os dados do formulário para a API.
  const handleSubmit = async () => {
    if (!produtoData.picture) {
      produtoData.picture = produtoData.defaultPicture;
    }

    if (!validateFields()) {
      toast.warning("Preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing) {
        const response = await api.put(
          `/produtos/${produtoData.id}`,
          produtoData
        );
        console.log("Produto atualizado:", response.data);
        toast.success("Item atualizado com sucesso!");
      } else {
        const response = await api.post("/produtos", produtoData);
        console.log("Produto adicionado:", response.data);
        toast.success("Produto cadastrado com sucesso!");
      }
      handleCancel();
    } catch (error) {
      console.error("Erro ao adicionar/atualizar produto:", error);
      toast.error("Erro ao adicionar/atualizar produto.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card title={"Cadastro de Produto"} icon={"bi bi-box-seam"}>
      <ToastContainer />
      <FormContainer>
        <InputField
          label={"Nome"}
          name={"nome"}
          value={produtoData.nome || ""}
          onChange={handleFieldChange}
          warn={errors.nome}
        />
        <InputField
          label={"Marca"}
          name={"marca"}
          value={produtoData.marca || ""}
          onChange={handleFieldChange}
          warn={errors.marca}
        />
        <InputField
          label={"Categoria"}
          name={"categoria"}
          value={produtoData.categoria || ""}
          onChange={handleFieldChange}
          warn={errors.categoria}
        />
        <SelectField
          label={"Fornecedor"}
          name={"fornecedor_id"}
          value={produtoData.fornecedor_id || ""}
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
          label={"Foto"}
          name={"picture"}
          value={produtoData.picture || ""}
          placeholder={"URL da Imagem"}
          onChange={handleFieldChange}
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

export default CadastroProduto;
