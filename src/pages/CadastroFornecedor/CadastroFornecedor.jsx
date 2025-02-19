import { useContext, useEffect, useState } from "react";
import { ButtonContainer, FormContainer } from "./Styles";
import { ToastContainer, toast } from "react-toastify";
import { FormContext } from "../../contexts/FormContext";
import { InputField, SelectField } from "../../components/Form/Form";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import api from "../../services/api";
import "react-toastify/dist/ReactToastify.min.css";

/**
 * Componente para cadastro de fornecedores.
 * Este componente permite adicionar ou editar fornecedores no sistema.
 *
 * @component CadastroFornecedor
 * @returns {JSX.Element} O elemento CadastroFornecedor.
 * @example
 * // Uso do componente
 *   <CadastroFornecedor />
 */
const CadastroFornecedor = () => {
  const { fornecedorData, handleChange, handleCancel } =
    useContext(FormContext);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    handleCancel();
  }, []);

  /**
   * Valida os campos obrigatórios do formulário.
   * @returns {boolean} True se todos os campos obrigatórios estiverem preenchidos, caso contrário, false.
   */
  const validateFields = () => {
    let validationErrors = {};
    const requiredFields = [
      "nome",
      "cnpj",
      "celular",
      "email",
      "cep",
      "endereco",
      "bairro",
      "cidade",
      "estado",
    ];

    requiredFields.forEach((field) => {
      if (!fornecedorData[field]) {
        validationErrors[field] = `O campo ${
          field.charAt(0).toUpperCase() + field.slice(1)
        } é obrigatório.`;
      }
    });

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  /**
   * Manipula a alteração dos campos do formulário.
   * @param {Event} e - Evento de mudança do input.
   */
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    handleChange(e, "fornecedor");
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : prevErrors[name],
    }));
  };

  // Reseta o formulário e os erros.
  const handleReset = () => {
    handleCancel();
    setErrors({});
  };

  // Submete o formulário após validação.

  const handleSubmit = async () => {
    if (!validateFields()) {
      toast.warning("Preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/fornecedores", fornecedorData);
      toast.success("Fornecedor cadastrado com sucesso!");
      handleCancel();
    } catch (error) {
      toast.error("Erro ao adicionar fornecedor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card title={"Cadastro de Fornecedor"} icon={"bi bi-truck"}>
      <ToastContainer />
      <FormContainer>
        {/* Campos do formulário */}
        <InputField
          label={"Nome"}
          name={"nome"}
          value={fornecedorData.nome || ""}
          onChange={handleFieldChange}
          warn={errors.nome}
        />
        <InputField
          label={"CNPJ"}
          name={"cnpj"}
          value={fornecedorData.cnpj || ""}
          onChange={handleFieldChange}
          placeholder={"xx.xxx.xxx/0001-xx"}
          warn={errors.cnpj}
        />
        <InputField
          label={"Telefone"}
          name={"telefone"}
          value={fornecedorData.telefone || ""}
          onChange={handleFieldChange}
          placeholder={"(xx)xxxx-xxxx"}
        />
        <InputField
          label={"Celular"}
          name={"celular"}
          value={fornecedorData.celular || ""}
          onChange={handleFieldChange}
          warn={errors.celular}
          placeholder={"(xx)xxxxx-xxxx"}
        />
        <InputField
          label={"E-mail"}
          name={"email"}
          type={"email"}
          value={fornecedorData.email || ""}
          onChange={handleFieldChange}
          warn={errors.email}
          placeholder={"email@email.com"}
        />
        <InputField
          label={"Site"}
          name={"site"}
          value={fornecedorData.site || ""}
          onChange={handleFieldChange}
        />
        <InputField
          label={"CEP"}
          name={"cep"}
          value={fornecedorData.cep || ""}
          onChange={handleFieldChange}
          warn={errors.cep}
          placeholder={"xx.xxx-xx"}
        />
        <InputField
          label={"Endereço"}
          name={"endereco"}
          value={fornecedorData.endereco || ""}
          onChange={handleFieldChange}
          warn={errors.endereco}
        />
        <InputField
          label={"Número"}
          name={"numero_endereco"}
          value={fornecedorData.numero_endereco || ""}
          onChange={handleFieldChange}
        />
        <InputField
          label={"Bairro"}
          name={"bairro"}
          value={fornecedorData.bairro || ""}
          onChange={handleFieldChange}
          warn={errors.bairro}
        />
        <InputField
          label={"Cidade"}
          name={"cidade"}
          value={fornecedorData.cidade || ""}
          onChange={handleFieldChange}
          warn={errors.cidade}
        />
        <InputField
          label={"UF"}
          name={"estado"}
          value={fornecedorData.estado || ""}
          placeholder={"ex: MG"}
          onChange={handleFieldChange}
          warn={errors.estado}
        />
        <InputField
          label={"Banco"}
          name={"banco"}
          value={fornecedorData.banco || ""}
          onChange={handleFieldChange}
        />
        <SelectField
          label="Tipo de Conta"
          name={"tipo_conta"}
          value={fornecedorData.tipo_conta || ""}
          onChange={handleFieldChange}
        >
          <option value="">Selecione</option>
          <option value="Conta Poupança PF">Conta Poupança PF</option>
          <option value="Conta Poupança PJ">Conta Poupança PJ</option>
          <option value="Conta Corrente PF">Conta Corrente PF</option>
          <option value="Conta Corrente PJ">Conta Corrente PJ</option>
        </SelectField>
        <InputField
          label={"Conta"}
          name={"conta"}
          value={fornecedorData.conta || ""}
          onChange={handleFieldChange}
        />
        <InputField
          label={"Agência"}
          name={"agencia"}
          value={fornecedorData.agencia || ""}
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

export default CadastroFornecedor;
